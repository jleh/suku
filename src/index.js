import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import fetch from 'unfetch';

import config from '../config.json';

import AncestorTree from './ancestorTree';
import Popup from './popup';
import Timeline from './timeline';
import Places from './places';

class App extends Component {
  constructor() {
    super();

    this.state = {
      data: null,
      selectedPerson: null,
      worldEvents: {},
      page: 'tree'
    };

    this.personSelected = this.personSelected.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.switchPage = this.switchPage.bind(this);
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

  switchPage(page) {
    this.setState({ page });
  }

  render() {
    const {
      data, page, selectedPerson, worldEvents
    } = this.state;

    if (!data) {
      return (
        <div>
          Ladataan...
        </div>
      );
    }

    return (
      <div>
        <div style={this.getMainContentStyle()}>
          <h1>{config.pageTitle}</h1>
          <nav>
            <button type="button" onClick={() => this.switchPage('tree')}>
              Sukupuu
            </button>
            <button type="button" onClick={() => this.switchPage('timeline')}>
              Aikajana
            </button>
            <button type="button" onClick={() => this.switchPage('places')}>
              Paikat
            </button>
          </nav>
          {page === 'tree' && <AncestorTree data={data} personSelected={this.personSelected} />}
          {page === 'timeline' && <Timeline data={data} worldEvents={worldEvents} />}
          {page === 'places' && <Places />}
        </div>
        {selectedPerson && <Popup person={selectedPerson} closePopup={this.closePopup} />}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
