class EpisodeSerializer < ActiveModel::Serializer
  attributes :title, :description, :pub_date, :duration, :collection_id, :guid,
             :url, :id
  attribute :episode_statuses, key: :subscription
  belongs_to :podcast

  def attributes(arg)
    super.to_camelback_keys
  end

  def episode_statuses
    object.episode_statuses[0].as_json.to_camelback_keys if object.episode_statuses[0].as_json
  end
end
