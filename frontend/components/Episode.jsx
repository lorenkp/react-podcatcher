import React from 'react';

export default class Episode extends React.Component {
  render() {
    const episodeInfo = this.props.episodeInfo;
    const mp3Link = episodeInfo.enclosure.url;
    const description = episodeInfo.description;
    const duration = episodeInfo['itunes:duration']
    debugger


    return (
      <div>hello</div>
      );
  }
}
