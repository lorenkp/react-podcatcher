class EpisodeSerializer < ActiveModel::Serializer
  attributes :title, :description, :pub_date, :duration, :collection_id, :guid,
             :url
  attribute :episode_statuses, key: :subscription
  has_many :episode_statuses, key: :subscription

  def attributes(arg)
    super.to_camelback_keys
  end
end
