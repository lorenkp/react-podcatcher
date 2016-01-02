class PodcastSerializer < ActiveModel::Serializer
  attributes :id, :artist_name, :collection_name, :feed_url, :artwork_url
  has_many :subscriptions
end
