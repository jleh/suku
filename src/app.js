import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import fetch from 'unfetch';

import config from '../config.json';

import Header from './header';
import AncestorTree from './ancestorTree';
import Person from './person';
import Timeline from './timeline';
import Places from './places';
import personTree from './personTree';
import PersonList from './personList';

class App extends Component {
  constructor() {
    super();

    this.state = {
      data: null,
      worldEvents: {}
    };

    this.personSelected = this.personSelected.bind(this);
  }

  componentDidMount() {
    fetch('/suku/family.json')
      .then(res => res.json())
      .then(data => this.setState({
        data: personTree(data.persons, config.rootPerson),
        persons: data.persons,
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
      data, worldEvents, updated, persons
    } = this.state;

    if (!data) {
      return <div>Ladataan...</div>;
    }

    return (
      <div>
        <Header updated={updated} />
        <Route path="/" exact component={() => <AncestorTree data={data} personSelected={this.personSelected} />} />
        <Route path="/timeline" component={() => <Timeline data={data} worldEvents={worldEvents} />} />
        <Route path="/places" component={() => <Places data={data} />} />
        <Route path="/person/:id" component={() => <Person persons={persons} />} />
        <Route path="/persons" component={() => <PersonList persons={persons} />} />
      </div>
    );
  }
}

export default withRouter(App);
