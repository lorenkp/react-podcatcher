class RenamePodcastIdInTables < ActiveRecord::Migration
  def change
    rename_column :podcasts, :podcast_id, :collection_id
    rename_column :subscriptions, :podcast_id, :collection_id
    rename_column :episodes, :podcast_id, :collection_id
  end
end
