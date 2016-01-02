class ChangeForeignKeyToPodcastId < ActiveRecord::Migration
  def change
    rename_column :podcasts, :collection_id, :podcast_id
    rename_column :subscriptions, :collection_id, :podcast_id
  end
end
