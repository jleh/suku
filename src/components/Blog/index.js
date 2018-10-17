import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

export default class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  componentDidMount() {
    fetch('blog.md')
      .then(res => res.text())
      .then(text => this.setState({ text }));
  }

  render() {
    const { text } = this.state;

    return (
      <ReactMarkdown source={text} />
    );
  }
}
