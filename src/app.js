import React, { Component } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Route, withRouter } from 'react-router-dom';
import { withLocalize, Translate } from 'react-localize-redux';

import { hot } from 'react-hot-loader';

import './app.css';

import translations from './translations/translations.json';

import { getWorldEvents, getData, getPlaces } from './api';

import PersonContext from './context/personContext';
import PlacesContext from './context/placeContext';

import Header from './components/Header';
import AncestorTree from './components/AncestorTree';
import Person from './components/Person';
import Timeline from './components/Timeline';
import Places from './components/Places';
import PersonList from './components/PersonList';
import Place from './components/Places/Place';
import House from './components/Places/House';
import Blog from './components/Blog';


class App extends Component {
  constructor(props) {
    super(props);

    const { initialize } = this.props;

    this.state = {
      data: null,
      places: [],
      worldEvents: {},
      placesById: new Map()
    };

    initialize({
      languages: ['fi'],
      translation: translations,
      options: { renderToStaticMarkup }
    });

    this.personSelected = this.personSelected.bind(this);
  }

  componentDidMount() {
    getData().then(data => this.setState(data));
    getWorldEvents().then(worldEvents => this.setState({ worldEvents }));
    getPlaces().then(placesData => this.setState(placesData));
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
        <PlacesContext.Provider value={{ places, placesById, worldEvents }}>
          <div>
            <Header updated={updated} />
            <Route path="/" exact component={() => <AncestorTree data={data} personSelected={this.personSelected} />} />
            <Route path="/timeline" component={Timeline} />
            <Route path="/places" component={Places} />
            <Route path="/person/:id" component={Person} />
            <Route path="/persons" component={PersonList} />
            <Route path="/place/:id" component={Place} />
            <Route path="/house/:id" component={House} />
            <Route path="/blog" component={Blog} />
          </div>
        </PlacesContext.Provider>
      </PersonContext.Provider>
    );
  }
}

export default hot(module)(
  withRouter(
    withLocalize(App)
  )
);
