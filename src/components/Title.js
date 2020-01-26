import React, { Component } from "react";
import "./Title.css";

export default class Title extends Component {
  render() {
    const { title } = this.props;
    return (
      <div className="Title">
        <h1>{title}</h1>
      </div>
    );
  }
}
