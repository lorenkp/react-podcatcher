class CreateEpisodeStatuses < ActiveRecord::Migration
  def change
    create_table :episode_statuses do |t|
      t.integer :subscription_id, null: false
      t.integer :episode_id, null: false
      t.boolean :played, null: false
      t.integer :time_elapsed, null: false
      t.boolean :favorite, null: false

      t.timestamps null: false
    end
    add_index :episode_statuses, [:subscription_id, :episode_id], unique: true
  end
end
