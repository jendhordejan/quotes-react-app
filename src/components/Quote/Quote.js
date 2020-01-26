import React, { Component } from "react";
import "./Quote.css";

export default class Quote extends Component {
  handleQuoteText = (likeActive, dislikeActive) => {
    console.log(
      "handleQuoteText",
      `like: ${likeActive} dislike: ${dislikeActive}`
    );
    switch (true) {
      case likeActive && !dislikeActive:
        return "like";
        break;
      case dislikeActive && !likeActive:
        return "dislike";
        break;
      default:
        return "";
        break;
    }
  };

  render() {
    const { quoteId, quoteText, quoteAuthor, quote } = this.props;
    console.log("Quote.js: ", quote);
    return (
      <div>
        <div
          className="mb-wrap mb-style-2 blockquote:after"
          id={this.handleQuoteText(
            this.props.likeActive,
            this.props.dislikeActive
          )}
          key={quoteId}
        >
          <blockquote cite="http://www.gutenberg.org/ebboks/11">
            <p> {quoteText}</p>
          </blockquote>
        </div>
        <div class="mb-attribution">
          <p class="mb-author">
            By: {quoteAuthor}
            <button
              onClick={this.props.handleLikedClicked}
              className={this.props.likeActive ? "active" : ""}
            >
              :)
            </button>
            <button
              onClick={this.props.handleDislikedClicked}
              className={this.props.dislikeActive ? "active" : ""}
            >
              :(
            </button>
          </p>
        </div>
      </div>
    );
  }
}
