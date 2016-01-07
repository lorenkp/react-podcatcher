class ChangeEpisodeStatusDefaultValues < ActiveRecord::Migration
  def change
    change_column :episode_statuses, :played, :boolean, default: false
    change_column :episode_statuses, :favorite, :boolean, default: false
    change_column :episode_statuses, :time_elapsed, :integer, default: 0
  end
end
