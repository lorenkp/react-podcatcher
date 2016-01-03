class RenameArtworkColumnInPodcasts < ActiveRecord::Migration
  def change
    rename_column :podcasts, :artwork_url, :artwork_url_600
  end
end
