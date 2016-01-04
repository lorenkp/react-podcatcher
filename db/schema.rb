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

ActiveRecord::Schema.define(version: 20160104024148) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "episodes", force: :cascade do |t|
    t.string   "title"
    t.string   "duration"
    t.string   "date"
    t.string   "guid",       null: false
    t.integer  "podcast_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "episodes", ["guid"], name: "index_episodes_on_guid", unique: true, using: :btree
  add_index "episodes", ["podcast_id"], name: "index_episodes_on_podcast_id", using: :btree

  create_table "podcasts", force: :cascade do |t|
    t.string   "artist_name",     null: false
    t.string   "collection_name", null: false
    t.string   "feed_url",        null: false
    t.string   "artwork_url_600", null: false
    t.integer  "podcast_id",      null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "podcasts", ["podcast_id"], name: "index_podcasts_on_podcast_id", unique: true, using: :btree

  create_table "subscriptions", force: :cascade do |t|
    t.integer  "podcast_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
