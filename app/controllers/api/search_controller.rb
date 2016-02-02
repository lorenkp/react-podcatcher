require 'open-uri'
class Api::SearchController < ApplicationController
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

  def initialize
    @itunes_connection = HTTP.persistent('https://itunes.apple.com')
  end

  def show
    query = "https://itunes.apple.com/search?entity=podcast&attribute=titleTerm&limit=10&term=#{URI.encode(params[:id])}"
    result = hash_podcasts(itunes_query_results(query))
    render json: result
  end

  private

  def construct_podcast_hash(hashed_xml)
    podcast_hash = {}
    podcast_hash[:description] = {}
    XML_FIELDS.each do |field|
      podcast_hash[:description][field] = hashed_xml[field]
    end
    podcast_hash[:episodes] = hashed_xml['item']
    podcast_hash
  end

  def itunes_query_results(query)
    response = @itunes_connection.get(query).to_s
    JSON.parse(response)['results']
    # JSON.parse(open(query).read)['results']
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
