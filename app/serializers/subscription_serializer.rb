class SubscriptionSerializer < ActiveModel::Serializer
  attributes :id
  belongs_to :podcast
  has_many :episodes, through: :podcast
end
