import React from 'react';

export default class Episode extends React.Component {
  render() {
    var title = this.props.episodeInfo.title


    return (
      <li>
        { title }
      </li>
      );
  }
}
