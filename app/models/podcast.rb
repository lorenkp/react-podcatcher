class Podcast < ActiveRecord::Base
  self.primary_key = 'podcast_id'
  has_many :subscriptions
end
