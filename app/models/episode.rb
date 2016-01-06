class Episode < ActiveRecord::Base
  has_many :episode_statuses
  belongs_to :podcast, class_name: 'Podcast', foreign_key: :collection_id
  validates :collection_id, :url, :guid, presence: true
end
