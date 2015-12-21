class Api::SearchController < ApplicationController
  FIELDS = [
    'artistName',
    'collectionName',
    'feedUrl',
    'artworkUrl100',
    'collectionId'
  ]

  def index
    query = "https://itunes.apple.com/search?entity=podcast&attribute=titleTerm&limit=10&term=#{params[:term]}"
    render json: hash_podcasts(itunes_query_results(query))
  end

  def show
    query = "https://itunes.apple.com/lookup?id=#{params[:id]}"
    podcast_listing = itunes_query_results(query)[0]
    podcast_feed_url = itunes_query_results(query)[0]['feedUrl']
    xml_data = Net::HTTP.get_response(URI.parse(podcast_feed_url)).body
    feed_hash = Crack::XML.parse(xml_data.to_s)
    episodes = parse_episodes(feed_hash, 'item')
    episodes << podcast_listing['collectionName']
    # podcast name will be pulled from last index in array
    render json: episodes
  end

  private

  def parse_episodes(obj, key)
    if obj.respond_to?(:key?) && obj.key?(key)
      obj[key]
    elsif obj.respond_to?(:each)
      r = nil
      obj.find { |*a| r = parse_episodes(a.last, key) }
      r
    end
  end

  def itunes_query_results(query)
    uri = URI(query)
    response = Net::HTTP.get(uri)
    JSON.parse(response)['results']
  end

  def hash_podcasts(json_results)
    json_results.map do |podcast|
      podcast_hash = {}
      FIELDS.each do |info|
        podcast_hash[info] = podcast[info]
      end
      podcast_hash
    end
  end
end

# xml_data = Net::HTTP.get_response(URI.parse(http://www.bbc.co.uk/programmes/b006qykl/episodes/downloads.rss)).body
