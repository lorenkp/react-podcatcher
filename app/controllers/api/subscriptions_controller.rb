class Api::SubscriptionsController < ApplicationController
  def create
    unless Podcast.exists?(params[:subscription][:collection_id])
      Podcast.new(podcast_params).save
    end

    unless Subscription.exists?(collection_id: params[:subscription][:collection_id])
      subscription = Subscription.new(subscription_params)
      subscription.save
    end
    render json: subscription
  end

  def destroy
    subscription = Subscription.find_by_collection_id(params[:id]).destroy
    render json: subscription
  end

  private

  def podcast_params
    params.require(:subscription).permit(:artist_name, :collection_name,
                                         :feed_url, :artwork_url, :collection_id)
  end

  def subscription_params
    params.require(:subscription).permit(:collection_id)
  end
end
