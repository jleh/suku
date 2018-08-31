import React, { Component } from 'react';
import { Route } from 'react-router-dom';
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
        <Route path="/" component={() => <AncestorTree data={data} personSelected={this.personSelected} />} />
        <Route path="/timeline" component={() => <Timeline data={data} worldEvents={worldEvents} />} />
        <Route path="/places" component={() => <Places data={data} />} />
      </div>
    );

    /*
    return (
      <div>
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
        {page === 'places' && <Places data={data} />}

        {selectedPerson && <Popup person={selectedPerson} closePopup={this.closePopup} />}
      </div>
    );
    */
  }
}

export default App;
