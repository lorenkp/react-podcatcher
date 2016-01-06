class Podcast < ActiveRecord::Base
  self.primary_key = 'collection_id'
  has_many :subscriptions, class_name: 'Subscription', foreign_key: :collection_id
  has_many :episodes, class_name: 'Episode', foreign_key: :collection_id
end
