class EpisodeStatus < ActiveRecord::Base
  validates :subscription_id, :episode_id, :time_elapsed, presence: true
  validates :subscription_id, uniqueness: { scope: :episode_id }
  validates_inclusion_of :favorite, :played, in: [false]

  belongs_to :subscription
  belongs_to :episode
  has_one :podcast, through: :episode
end
