class AddDescriptionToPodcasts < ActiveRecord::Migration
  def change
    add_column :podcasts, :description, :string
    add_column :podcasts, :podcast_url, :string
  end
end
