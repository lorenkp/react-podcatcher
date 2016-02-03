require 'open-uri'
class Api::EpisodesController < ApplicationController
  # include EpisodeLoader
  FIELDS = %w(title pubDate)

  # keys for itunes JSON response
  # ITUNES_FIELDS = [
  #   'artistName',
  #   'collectionName',
  #   'feedUrl',
  #   'artworkUrl600',
  #   'collectionId'
  # ]

  def index
    query = "https://itunes.apple.com/lookup?id=#{params[:podcast_id]}"
    feed_url = params[:feedUrl] || itunes_query_results(query)[0]['feedUrl']
    hashed_xml = Crack::XML.parse(open(feed_url).read)['rss']['channel']
    parsed_episodes = parse_episodes(hashed_xml)
    # parsed_episodes = EpisodeLoader.find(feed_url)
    # for DB saving, changing from JSON camelCase to Rails snake_case
    snaked_episodes = parsed_episodes.map(&:to_snake_keys).take(100)
    current_guids = Episode.where(collection_id: params[:podcast_id]).map(&:guid)
    snaked_episodes.each do |episode|
      new_episode(episode) unless current_guids.include?(episode[:guid])
      # new_episode_with_status(episode) unless Episode.find_by_guid(episode[:guid])
    end
    render json: Podcast.find(params[:podcast_id]).episodes
    # render json: parsed_episodes
  end

  def show
  end

  private

  def episode_id(podcast_hash)
    podcast_hash[:episodes].each do |episode|
      episode[:id] = encode_utf8_base64(episode['guid'])
    end
    podcast_hash
  end

  def create_guid(episode)
    Base64.encode64(episode).delete("\n", '')
  end

  def decode_utf8_base64(string)
    URI.unescape(CGI.escape(Base64.decode64(string)))
  end

  def new_episode(episode)
    new_episode = Episode.create(episode)
    new_status(new_episode) if Subscription.exists?(collection_id: params[:podcast_id])
  end

  def new_status(new_episode)
    subscription_id = Subscription.find_by_collection_id(new_episode.collection_id).id
    new_episode.episode_statuses.create(subscription_id: subscription_id)
  end

  def parse_episodes(hashed_xml)
    raw_episodes = hashed_xml['item']
    episodes = []
    # edge case for if there's only one episode
    if raw_episodes.is_a?(Array)
      raw_episodes.each { |episode| episodes << assemble_episode_hash(episode) }
    else
      episodes << assemble_episode_hash(raw_episodes)
    end
    episodes
  end

  def assemble_episode_hash(episode)
    hash = {}
    FIELDS.each do |field|
      hash[field] = episode[field]
    end
    # sometimes the description is in itunes:summary
    if episode['itunes:summary']
      hash['description'] = episode['itunes:summary']
    else
      hash['description'] = episode['description']
    end
    begin
      hash[:url] = episode['enclosure']['url']
    rescue
    end
    hash[:collection_id] = params[:podcast_id]
    hash[:guid] = create_guid(episode['guid'])
    hash
  end

  def itunes_query_results(query)
    JSON.parse(open(query).read)['results']
  end

  # def hash_podcasts(json_results)
  #   json_results.map do |podcast|
  #     podcast_hash = {}
  #     ITUNES_FIELDS.each do |info|
  #       podcast_hash[info] = podcast[info]
  #     end
  #     podcast_hash
  #   end
  # end
end
