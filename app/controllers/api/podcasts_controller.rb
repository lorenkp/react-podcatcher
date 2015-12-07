class Api::PodcastsController < ApplicationController
  FIELDS = [
    'collectionName',
    'feedUrl',
    'artworkUrl100'
  ]
  def search
    render json: hash_podcasts(itunes_query_results)
  end

  def show
    xml_data = Net::HTTP.get_response(URI.parse(params[:feed_url])).body
    render json: Crack::XML.parse(xml_data.to_s)
  end

  private

  def itunes_query_results
    itunes_query = "https://itunes.apple.com/search?entity=podcast&term=#{params[:term]}"
    uri = URI(itunes_query)
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
