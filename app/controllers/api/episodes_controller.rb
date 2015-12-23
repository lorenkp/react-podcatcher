class Api::EpisodesController < ApplicationController
  XML_FIELDS = [
    'title',
    'itunes:author',
    'link',
    'description',
    'guid'
  ]

  # keys for itunes JSON response
  ITUNES_FIELDS = [
    'artistName',
    'collectionName',
    'feedUrl',
    'artworkUrl600',
    'collectionId'
  ]

  def index
    query = "https://itunes.apple.com/lookup?id=#{params[:podcast_id]}"
    itunes_listing = itunes_query_results(query)[0]
    feed_url = itunes_listing['feedUrl']
    raw_xml = Net::HTTP.get_response(URI.parse(feed_url)).body
    hashed_xml = Crack::XML.parse(raw_xml.to_s)['rss']['channel']
    podcast_hash = construct_podcast_hash(hashed_xml)
    podcast_hash[:description][:image] = itunes_listing['artworkUrl600']
    podcast_hash[:description][:id] = itunes_listing['collectionId']
    render json: podcast_hash
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

  def encode_utf8_base64(episode)
    Base64.encode64(episode).delete("\n", '')
  end

  def decode_utf8_base64(string)
    URI.unescape(CGI::escape(Base64.decode64(string)))
  end

  def construct_podcast_hash(hashed_xml)
    podcast_hash = {}
    podcast_hash[:description] = {}
    XML_FIELDS.each do |field|
      podcast_hash[:description][field] = hashed_xml[field]
    end
    podcast_hash[:episodes] = hashed_xml['item']
    episode_id(podcast_hash)
  end

  def itunes_query_results(query)
    uri = URI(query)
    response = Net::HTTP.get(uri)
    JSON.parse(response)['results']
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
