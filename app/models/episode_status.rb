class EpisodeStatus < ActiveRecord::Base
  validates :subscription_id, :episode_id, :played, :time_elapsed, :favorite,
            presence: true
  validates :subscription_id, uniqueness: { scope: :episode_id }

  belongs_to :subscription
  belongs_to :episode
end
