import React, { Component } from "react";
import Title from "../Title";
import Quote from "../Quote/Quote";
import "./QuoteSearcher.css";

export default class QuoteSearcher extends Component {
  state = {
    quotes: [],
    query: "tree",
    likeCount: 0,
    dislikeCount: 0
  };

  invokeAPIToFetchData = async () => {
    try {
      const quoteItems = await fetch(
        `https://quote-garden.herokuapp.com/quotes/search/${this.state.query}`
      );
      const parsedQuoteItems = await quoteItems.json();
      const updateQuoteList = parsedQuoteItems.results.map(quoteItem => {
        return {
          ...quoteItem,
          likeActive: false,
          likeness: 0,
          dislikeness: 0
        };
      });

      console.log("updateQuoteListcount: ", updateQuoteList.length);
      this.setState({
        loading: true,
        noResult: false,
        quotes: updateQuoteList
      });
    } catch (error) {
      this.setState({
        error: error
      });
    }
  };

  componentDidMount = async () => {
    this.invokeAPIToFetchData();
  };

  handleLikedClicked = quoteId => {
    console.log("quote id", quoteId);
    const mappedLikes = this.state.quotes.map(quote => {
      if (quote._id === quoteId) {
        quote.likeActive = true;
        quote.dislikeActive = false;
        this.setState({ likeCount: this.state.likeCount + 1 });
        this.state.dislikeCount != 0 &&
          this.setState({ dislikeCount: this.state.dislikeCount - 1 });
        return {
          ...quote
        };
      } else {
        return { ...quote };
      }
    });
    this.setState({ quotes: mappedLikes });
    console.log("after map likes: ", this.state.quotes);
  };
  handleDislikedClicked = quoteId => {
    console.log("quote id", quoteId);
    const mappedDisLikes = this.state.quotes.map(quote => {
      if (quote._id === quoteId) {
        quote.likeActive = false;
        quote.dislikeActive = true;
        this.setState({ dislikeCount: this.state.dislikeCount + 1 });
        this.state.likeCount != 0 &&
          this.setState({ likeCount: this.state.likeCount - 1 });
        return {
          ...quote
        };
      } else {
        return { ...quote };
      }
    });
    this.setState({ quotes: mappedDisLikes });
    console.log("after map likes: ", this.state.quotes);
  };

  displayQuotes = quotes => {
    return quotes.map(quoteItem => (
      <div>
        <Quote
          quote={quoteItem}
          quoteText={quoteItem.quoteText}
          quoteAuthor={quoteItem.quoteAuthor}
          handleLikedClicked={() => this.handleLikedClicked(quoteItem._id)}
          handleDislikedClicked={() =>
            this.handleDislikedClicked(quoteItem._id)
          }
          likeActive={quoteItem.likeActive}
          dislikeActive={quoteItem.dislikeActive}
        />
      </div>
    ));
  };

  render() {
    console.log("render QuoteSearcher");
    return !this.state.loading ? (
      <div className="flex-header-container">
        <div>
          <Title title="Quotes-a-hoi" />
          <h2 className="loading">Loading some awsome quotes!</h2>
        </div>
      </div>
    ) : (
      <div className="quote-nav">
        <div className="flex-header-container">
          <div>
            <Title title="Quotes-a-hoi" />
          </div>
        </div>
        <div className="likes-dislikes-container">
          <p>
            likes: {this.state.likeCount} | dislikes:
            {this.state.dislikeCount}
          </p>
        </div>
        <div className="flex-quotelist-container">
          {this.displayQuotes(this.state.quotes)}
        </div>
      </div>
    );
  }
}
