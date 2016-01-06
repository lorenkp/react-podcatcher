class ModifyEpisodes < ActiveRecord::Migration
  def change
    add_column :episodes, :url, :string, null: false
    add_column :episodes, :description, :string
    add_column :episodes, :guid, :string
    rename_column :episodes, :date, :pub_date
    add_index :episodes, :guid, unique: true
  end
end
