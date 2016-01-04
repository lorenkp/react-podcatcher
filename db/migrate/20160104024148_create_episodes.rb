class CreateEpisodes < ActiveRecord::Migration
  def change
    create_table :episodes do |t|
      t.string :title
      t.string :duration
      t.string :date
      t.integer :podcast_id, null: false

      t.timestamps null: false
    end
    add_index :episodes, :podcast_id
  end
end
