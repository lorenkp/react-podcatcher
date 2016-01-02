class Api::SubscriptionsController < ApplicationController
  def create
    unless Podcast.exists?(params[:subscription][:podcast_id])
      Podcast.new(podcast_params).save
    end

    unless Subscription.exists?(podcast_id: params[:subscription][:podcast_id])
      subscription = Subscription.new(subscription_params)
      subscription.save
    end
    render json: subscription
  end

  def destroy
    subscription = Subscription.podcast_id(params[:id]).destroy
    render json: subscription
  end

  def index
    @subscriptions = Subscription.all
    render json: @subscriptions
  end

  private

  def podcast_params
    params.require(:subscription).permit(:artist_name, :collection_name,
                                         :feed_url, :artwork_url, :podcast_id)
  end

  def subscription_params
    params.require(:subscription).permit(:podcast_id)
  end
end
