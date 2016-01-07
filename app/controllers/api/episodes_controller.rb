class Api::EpisodesController < ApplicationController
  FIELDS = [
    'title',
    'pubDate',
    'description'
  ]

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
    # for DB saving, changing from JSON camelCase to Rails snake_case
    snaked_episodes = parsed_episodes.map(&:to_snake_keys)
    snaked_episodes.each do |episode|
      Episode.create(episode) unless Episode.find_by_guid(episode[:guid])
    end
    render json: Episode.where(collection_id: params[:podcast_id])
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
    URI.unescape(CGI::escape(Base64.decode64(string)))
  end

  def parse_episodes(hashed_xml)
    raw_episodes = hashed_xml['item']
    episodes = []
    raw_episodes.each do |episode|
      hash = {}
      FIELDS.each do |field|
        hash[field] = episode[field]
      end
      hash[:url] = episode['enclosure']['url']
      hash[:collection_id] = params[:podcast_id]
      hash[:guid] = create_guid(episode['guid'])
      episodes << hash
    end
    episodes
  end

  def itunes_query_results(query)
    JSON.parse(open(query).read)['results']
  end

  def hash_podcasts(json_results)
    json_results.map do |podcast|
      podcast_hash = {}
      ITUNES_FIELDS.each do |info|
        podcast_hash[info] = podcast[info]
      end
      podcast_hash
    end
  end
end
