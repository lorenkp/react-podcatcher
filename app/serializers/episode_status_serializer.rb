class EpisodeStatusSerializer < ActiveModel::Serializer
  attributes :id, :played, :time_elapsed, :favorite
  belongs_to :episode
  belongs_to :subscription

  def attributes(arg)
    super.to_camelback_keys
  end
end
