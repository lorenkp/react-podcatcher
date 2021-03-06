class Api::SubscriptionsController < ApplicationController
  def create
    unless Podcast.exists?(params[:subscription][:collection_id])
      Podcast.create(podcast_params)
    end

    unless Subscription.exists?(collection_id: params[:subscription][:collection_id])
      @subscription = Subscription.create(subscription_params)
    end
    create_episode_statuses
    render json: @subscription, include: :podcast
  end

  def destroy
    subscription = Subscription.find(params[:id]).destroy
    render json: subscription, include: :podcast
  end

  def index
    @subscriptions = Subscription.includes(:podcast, :episodes)
    @subscriptions.each do |subscription|
      subscription.podcast.feed_url
    end
    render json: @subscriptions
  end

  def new_releases

  end

  private

  def create_episode_statuses
    episodes = Episode.where(collection_id: params[:subscription][:collection_id])
    episodes.each do |episode|
      episode.episode_statuses.create(subscription_id: @subscription.id)
    end
  end

  def podcast_params
    params.require(:subscription).permit(:artist_name, :collection_name,
                                         :feed_url, :artwork_url_600, :collection_id)
  end

  def subscription_params
    params.require(:subscription).permit(:collection_id)
  end
end
