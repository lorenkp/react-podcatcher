class Episode < ActiveRecord::Base
  has_many :episode_statuses
  belongs_to :podcast
  validates :podcast_id, presence: true
end
