import React, { Component } from "react";
import Title from "../Title";
import Quote from "../Quote/Quote";
import "./QuoteSearcher.css";

export default class QuoteSearcher extends Component {
  state = {
    quotes: [],
    query: "tree"
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

  displayQuotes = quotes => {
    return quotes.map(quoteItem => (
      <Quote
        quoteText={quoteItem.quoteText}
        quoteAuthor={quoteItem.quoteAuthor}
      />
    ));
  };

  render() {
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
        <div className="flex-quotelist-container">
          {this.displayQuotes(this.state.quotes)}
        </div>
      </div>
    );
  }
}
