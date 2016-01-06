class EpisodeSerializer < ActiveModel::Serializer
  attributes :title, :description, :pub_date, :duration, :collection_id, :guid

  def attributes(arg)
    super.to_camelback_keys
  end
end
