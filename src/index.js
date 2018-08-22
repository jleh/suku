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
      worldEvents: {}
    };

    this.personSelected = this.personSelected.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }

  componentDidMount() {
    fetch('family.json')
      .then(res => res.json())
      .then(data => this.setState({ data }));

    fetch('worldEvents.json')
      .then(res => res.json())
      .then(worldEvents => this.setState({ worldEvents }));
  }

  getMainContentStyle() {
    const { selectedPerson } = this.state;
    return selectedPerson ? { display: 'none' } : { display: 'block' };
  }

  personSelected(selectedPerson) {
    this.setState({ selectedPerson });
  }

  closePopup() {
    this.setState({ selectedPerson: null });
  }

  render() {
    const { data, selectedPerson, worldEvents } = this.state;

    return (
      <div>
        <div style={this.getMainContentStyle()}>
          {data && <AncestorTree data={data} personSelected={this.personSelected} />}
          {data && <Timeline data={data} worldEvents={worldEvents} />}
        </div>
        {selectedPerson && <Popup person={selectedPerson} closePopup={this.closePopup} />}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
