module EpisodeLoader
  def self.find(feed_url)
    hashed_xml = Crack::XML.parse(open(feed_url).read)['rss']['channel']
    parsed_episodes = parse_episodes(hashed_xml)
  end

  private

  def self.parse_episodes(hashed_xml)
    raw_episodes = hashed_xml['item']
    episodes = []
    if raw_episodes.is_a?(Array)
      raw_episodes.each { |episode| episodes << assemble_episode_hash(episode) }
    else
      episodes << assemble_episode_hash(raw_episodes)
    end
    episodes
  end

  def self.assemble_episode_hash(episode)
    fields = %w(title pubDate description)
    hash = {}
    fields.each do |field|
      hash[field] = episode[field]
    end
    begin
      hash[:url] = episode['enclosure']['url']
    rescue
    end
    hash[:collection_id] = params[:podcast_id]
    hash[:guid] = create_guid(episode['guid'])
    hash
  end
end
