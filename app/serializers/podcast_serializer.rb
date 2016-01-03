class PodcastSerializer < ActiveModel::Serializer
  attributes :id, :artist_name, :collection_name, :feed_url, :artwork_url_600

  def attributes(arg)
    super.to_camelback_keys
  end
end
