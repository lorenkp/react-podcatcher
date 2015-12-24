class CreatePodcasts < ActiveRecord::Migration
  def change
    create_table :podcasts do |t|
      t.string :artist_name, null: false
      t.string :collection_name, null: false
      t.string :feed_url, null: false
      t.string :artwork_url, null: false
      t.integer :collection_id, null: false

      t.timestamps null: false
    end
    add_index :podcasts, :collection_id, unique: true
  end
end
