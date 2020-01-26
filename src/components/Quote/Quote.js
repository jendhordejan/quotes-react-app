import React, { Component } from "react";
import "./Quote.css";

export default class Quote extends Component {
  render() {
    const { quoteId, quoteText, quoteAuthor } = this.props;
    return (
      <div>
        <div className="mb-wrap mb-style-2" id={quoteId} key={quoteId}>
          <blockquote cite="http://www.gutenberg.org/ebboks/11">
            <p> {quoteText}</p>
          </blockquote>
        </div>
        <div class="mb-attribution">
          <p class="mb-author">By: {quoteAuthor}</p>
        </div>
      </div>
    );
  }
}
