require 'open-uri'
class Api::PodcastsController < ApplicationController
  # keys for xml feed
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

  def show
    if Podcast.exists?(params[:id])
      render json: Podcast.find(params[:id]).as_json.to_camelback_keys
      return
    end
    query = "https://itunes.apple.com/lookup?id=#{params[:id]}"
    itunes_listing = itunes_query_results(query)[0]
    podcast = hash_podcasts(itunes_listing)
    pull_info_from_feed(podcast)
    render json: podcast
    snake_keys_hash = podcast.to_snake_keys
    artwork_url = snake_keys_hash.delete(:artwork_url600)
    snake_keys_hash[:artwork_url_600] = artwork_url
    Podcast.create(snake_keys_hash)
  end

  def new_releases
  end

  private

  # def construct_podcast_hash(hashed_xml)
  #   podcast_hash = {}
  #   podcast_hash[:description] = {}
  #   XML_FIELDS.each do |field|
  #     podcast_hash[:description][field] = hashed_xml[field]
  #   end
  #   podcast_hash[:episodes] = hashed_xml['item']
  #   podcast_hash
  # end

  def itunes_query_results(query)
    JSON.parse(open(query).read)['results']
  end

  def pull_info_from_feed(podcast)
    description = Crack::XML.parse(open(podcast['feedUrl']).read)['rss']['channel']['description']
    podcast['description'] = description
  end

  def hash_podcasts(json_results)
    # binding.pry
    # json_results.map do |podcast|
    #   podcast_hash = {}
    #   ITUNES_FIELDS.each do |info|
    #     podcast_hash[info] = podcast[info]
    #   end
    #   podcast_hash
    # end
    info_hash = {}
    ITUNES_FIELDS.each do |field|
      info_hash[field] = json_results[field]
    end
    info_hash
  end
end
