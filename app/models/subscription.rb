class Subscription < ActiveRecord::Base
  include EpisodeLoader
  belongs_to :podcast, foreign_key: :collection_id
  validates :collection_id, presence: true
  has_many :episodes, through: :podcast
  has_many :episode_statuses, dependent: :destroy

  def update_episodes
    episodes = EpisodeLoader.find(self.podcast.feed_url)
  end
end
