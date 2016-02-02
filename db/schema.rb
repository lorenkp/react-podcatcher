# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160129212556) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "episode_statuses", force: :cascade do |t|
    t.integer  "subscription_id",                 null: false
    t.integer  "episode_id",                      null: false
    t.boolean  "played",          default: false, null: false
    t.integer  "time_elapsed",    default: 0,     null: false
    t.boolean  "favorite",        default: false, null: false
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
  end

  add_index "episode_statuses", ["subscription_id", "episode_id"], name: "index_episode_statuses_on_subscription_id_and_episode_id", unique: true, using: :btree

  create_table "episodes", force: :cascade do |t|
    t.string   "title"
    t.string   "duration"
    t.string   "pub_date"
    t.integer  "collection_id", null: false
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.string   "url",           null: false
    t.string   "description"
    t.string   "guid"
  end

  add_index "episodes", ["collection_id"], name: "index_episodes_on_collection_id", using: :btree
  add_index "episodes", ["guid"], name: "index_episodes_on_guid", unique: true, using: :btree

  create_table "podcasts", force: :cascade do |t|
    t.string   "artist_name",     null: false
    t.string   "collection_name", null: false
    t.string   "feed_url",        null: false
    t.string   "artwork_url_600", null: false
    t.integer  "collection_id",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "description"
    t.string   "podcast_url"
  end

  add_index "podcasts", ["collection_id"], name: "index_podcasts_on_collection_id", unique: true, using: :btree

  create_table "subscriptions", force: :cascade do |t|
    t.integer  "collection_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

end
