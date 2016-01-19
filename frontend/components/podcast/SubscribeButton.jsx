import React from 'react';

var SubscribeButton = React.createClass({

  render: function() {
    return (
      <div onClick={ this.props.onToggle } className="sub-button">
        <span>{ this.props.subState ? 'Unsubscribe' : 'Subscribe' }</span>
      </div>
      )
  }
});

module.exports = SubscribeButton