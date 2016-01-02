class SubscriptionSerializer < ActiveModel::Serializer
  attributes :id, :podcast

  def podcast
    object.podcast
  end
end
