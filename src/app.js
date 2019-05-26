import React, { Component } from 'react';
import { connect } from 'react-redux';
import { renderToStaticMarkup } from 'react-dom/server';
import { Route, withRouter } from 'react-router-dom';
import { withLocalize, Translate } from 'react-localize-redux';

import { hot } from 'react-hot-loader';

import './app.css';

import translations from './translations/translations.json';

import { getWorldEvents, getData, getPlaces } from './api';
import { addPersons, addPlaces, addWorldEvents } from './actions';

import Header from './components/Header';
import AncestorTree from './components/AncestorTree';
import Person from './components/Person';
import Timeline from './components/Timeline';
import Places from './components/Places';
import PersonList from './components/PersonList';
import Place from './components/Places/Place';
import Blog from './components/Blog';

class App extends Component {
  constructor(props) {
    super(props);

    const { initialize } = this.props;

    initialize({
      languages: ['fi'],
      translation: translations,
      options: { renderToStaticMarkup }
    });

    this.personSelected = this.personSelected.bind(this);
    this.searchSelect = this.searchSelect.bind(this);
  }

  componentDidMount() {
    const { addPersons, addWorldEvents, addPlaces } = this.props;

    getData().then(data => addPersons(data));
    getWorldEvents().then(worldEvents => addWorldEvents(worldEvents));
    getPlaces().then(placesData => addPlaces(placesData));
  }

  personSelected(selectedPerson) {
    const { history } = this.props;
    history.push(`/person/${selectedPerson.id}`);
  }

  searchSelect(itemId) {
    const { history } = this.props;

    if (itemId.charAt(0) === 'I') {
      history.push(`/person/${itemId}`);
    } else if (itemId.charAt(0) === 'P') {
      history.push(`/place/${itemId}`);
    }
  }

  render() {
    const {
      data, updated, personList, placesById
    } = this.props;

    if (!data) {
      return <div><Translate id="loading" /></div>;
    }

    return (
      <div>
        <Header
          updated={updated}
          persons={personList}
          places={placesById}
          onSelect={this.searchSelect}
        />
        <Route path="/" exact component={() => <AncestorTree data={data} personSelected={this.personSelected} />} />
        <Route path="/timeline" component={Timeline} />
        <Route path="/places" component={Places} />
        <Route path="/person/:id" component={Person} />
        <Route path="/persons" component={PersonList} />
        <Route path="/place/:id" component={Place} />
        <Route path="/blog" component={Blog} />
      </div>
    );
  }
}

const mapStateToProps = ({ persons, places }) => ({
  updated: persons.updated,
  data: persons.data,
  personList: persons.personList,
  placesById: places.placesById
});

const mapDispatchToProps = { addPersons, addPlaces, addWorldEvents };

export default hot(module)(
  withRouter(
    withLocalize(
      connect(mapStateToProps, mapDispatchToProps)(App)
    )
  )
);
