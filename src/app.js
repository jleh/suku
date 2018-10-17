import React, { Component } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Route, withRouter } from 'react-router-dom';
import { withLocalize, Translate } from 'react-localize-redux';
import fetch from 'unfetch';

import './app.css';

import config from '../config.json';
import translations from './translations/translations.json';

import PersonContext from './context/personContext';
import PlacesContext from './context/placeContext';

import Header from './components/Header';
import AncestorTree from './components/AncestorTree';
import Person from './components/Person';
import Timeline from './components/Timeline';
import Places from './places/places';
import treeBuilder from './treeBuilder';
import PersonList from './components/PersonList';
import Place from './places/place';
import Village from './places/village';
import Blog from './components/Blog';

import { createIdMap, createRefMap, createPlacesMap } from './util';

class App extends Component {
  constructor(props) {
    super(props);

    const { initialize } = this.props;

    this.state = {
      data: null,
      places: [],
      worldEvents: {}
    };

    initialize({
      languages: ['fi'],
      translation: translations,
      options: { renderToStaticMarkup }
    });

    this.personSelected = this.personSelected.bind(this);
  }

  componentDidMount() {
    fetch('/suku/family.json')
      .then(res => res.json())
      .then(data => this.setState({
        data: treeBuilder(data.persons, config.rootPerson),
        personList: data.persons,
        personsById: createIdMap(data.persons),
        personsByRef: createRefMap(data.persons),
        places: data.places,
        placesById: createPlacesMap(data.places),
        updated: data.updated
      }));

    fetch('/suku/worldEvents.json')
      .then(res => res.json())
      .then(worldEvents => this.setState({ worldEvents }));
  }

  personSelected(selectedPerson) {
    const { history } = this.props;
    history.push(`/person/${selectedPerson.id}`);
  }

  render() {
    const {
      data, worldEvents, updated, personList,
      personsById, personsByRef, places, placesById
    } = this.state;
    const personContext = {
      personsById, personsByRef, personList, data
    };

    if (!data) {
      return <div><Translate id="loading" /></div>;
    }

    return (
      <PersonContext.Provider value={personContext}>
        <PlacesContext.Provider value={{ places, placesById }}>
          <div>
            <Header updated={updated} />
            <Route path="/" exact component={() => <AncestorTree data={data} personSelected={this.personSelected} />} />
            <Route path="/timeline" component={() => <Timeline data={data} worldEvents={worldEvents} />} />
            <Route path="/places" component={Places} />
            <Route path="/person/:id" component={Person} />
            <Route path="/persons" component={PersonList} />
            <Route path="/place/:id" component={Place} />
            <Route path="/village/:id" component={Village} />
            <Route path="/blog" component={Blog} />
          </div>
        </PlacesContext.Provider>
      </PersonContext.Provider>
    );
  }
}

export default withRouter(
  withLocalize(App)
);
