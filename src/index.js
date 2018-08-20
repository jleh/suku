import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import fetch from 'unfetch';

import AncestorTree from './ancestorTree';
import Popup from './popup';
import Timeline from './timeline';

class App extends Component {
  constructor() {
    super();

    this.state = {
      data: null,
      selectedPerson: null,
    };

    this.personSelected = this.personSelected.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }

  componentDidMount() {
    fetch('family.json')
      .then(res => res.json())
      .then(data => this.setState({ data }));
  }

  personSelected(selectedPerson) {
    this.setState({ selectedPerson });
  }

  closePopup() {
    this.setState({ selectedPerson: null });
  }

  render() {
    const { data, selectedPerson } = this.state;

    return (
      <div>
        {data && <AncestorTree data={data} personSelected={this.personSelected} />}
        {data && <Timeline data={data} />}
        {selectedPerson && <Popup person={selectedPerson} closePopup={this.closePopup} />}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
