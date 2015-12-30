import React from 'react';

var SubscribeButton = React.createClass({

  render: function() {
    return (
      <div onClick={ this.props.onToggle }>
        <p>
          { this.props.subState ? 'Unsubscribe' : 'Subscribe' }
        </p>
      </div>
      )
  }
});

module.exports = SubscribeButton