import React, { Component } from "react";

export default class Quote extends Component {
  render() {
    const { quoteId, quoteText, quoteAuthor } = this.props;
    return (
      <div className="quote-items" id={quoteId} key={quoteId}>
        <div className="quote-text">{quoteText}</div>
        <div className="quote-author">By: {quoteAuthor}</div>
      </div>
    );
  }
}
