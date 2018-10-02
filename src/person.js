import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Translate } from 'react-localize-redux';

import Family from './family';
import Sources from './sources';
import Wikipedia from './wikipedia';
import LinkedPerson from './linkedPerson';

const PersonDiv = styled.div`
  padding-left: 1em;
`;

const Place = styled.span`
  font-style: italic;
`;

const Parents = styled.div`
  margin-top: 1em;
`;

const Events = styled.table`
  margin-top: 1em;
  min-width: 60%;
`;

const EventDate = styled.td`
  width: 6em;
`;

const renderPlace = place => (place ? place.name : '');

const getYear = date => date.substring(date.length - 4);
const getAge = (date, birth) => (birth ? Number(getYear(date)) - Number(getYear(birth)) : null);
const renderAge = (date, birth) => (birth ? `${getAge(date, birth)} v` : null);

const Person = ({ persons, history, match }) => {
  const person = persons.find(p => p.id === match.params.id);

  if (!person.name) {
    return null;
  }

  const goBack = () => history.goBack();

  const {
    birth, birthPlace, death, deathPlace, personEvents
  } = person.events;

  return (
    <PersonDiv>
      <h2>{person.name}</h2>

      {birth && <div>* {birth} {renderPlace(birthPlace)}</div>}
      {death && <div>† {death} {renderPlace(deathPlace)} {renderAge(death, birth)}</div>}

      <Wikipedia person={person} />

      <Parents>
        <Translate id="person.parents" />:
        <LinkedPerson personRef={person.father} persons={persons} />
        <LinkedPerson personRef={person.mother} persons={persons} />
      </Parents>

      <Events>
        <tbody>
          {personEvents.map(event => (
            <tr key={event.id}>
              <EventDate>{event.date}</EventDate>
              <td><Translate id={`events.${event.type}`} /></td>
              <td>{event.description}</td>
              <td>
                <Place>{event.place && event.place.name}</Place>
              </td>
            </tr>
          ))}
        </tbody>
      </Events>

      <Family families={person.family} persons={persons} />
      <Sources sources={person.sources} />

      <button type="button" onClick={goBack}>
        <Translate id="back" />
      </button>
      <Link to="/">
        <button type="button">
          <Translate id="frontPage" />
        </button>
      </Link>
    </PersonDiv>
  );
};

export default withRouter(Person);
