class Subscription < ActiveRecord::Base
  belongs_to :podcast, foreign_key: :collection_id
  validates :collection_id, presence: true
  has_many :episodes, through: :podcast
  has_many :episode_statuses, dependent: :destroy
end
