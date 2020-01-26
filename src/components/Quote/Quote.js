import React, { Component } from "react";
import "./Quote.css";

export default class Quote extends Component {
  state = {
    likeActive: false,
    dislikeActive: false
  };

  handleLike() {
    if (this.state.dislikeActive) {
      this.setLike();
      this.setDislike();
    }
    this.setLike();
  }

  handleDislike() {
    if (this.state.likeActive) {
      this.setDislike();
      this.setLike();
    }
    this.setDislike();
  }
  setDislike() {
    this.setState({
      dislikeActive: !this.state.dislikeActive
    });
  }
  setLike() {
    this.setState({
      likeActive: !this.state.likeActive
    });
  }

  handleQuoteText = () => {
    switch (true) {
      case this.state.likeActive:
        return "like";
        break;
      case this.state.dislikeActive:
        return "dislike";
        break;
      default:
        return "";
        break;
    }
  };

  render() {
    const { quoteId, quoteText, quoteAuthor } = this.props;
    return (
      <div>
        <div
          className="mb-wrap mb-style-2 blockquote:after"
          id={this.handleQuoteText()}
          key={quoteId}
        >
          <blockquote cite="http://www.gutenberg.org/ebboks/11">
            <p> {quoteText}</p>
          </blockquote>
        </div>
        <div class="mb-attribution">
          <p class="mb-author">By: {quoteAuthor}</p>
        </div>
        <div>
          <button
            onClick={() => this.handleLike()}
            className={this.state.likeActive ? "active" : ""}
          >
            :)
          </button>
          <button
            onClick={() => this.handleDislike()}
            className={this.state.dislikeActive ? "active" : ""}
          >
            :(
          </button>
        </div>
      </div>
    );
  }
}
