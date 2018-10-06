import React from 'react';
import styled from 'styled-components';
import { Translate } from 'react-localize-redux';
import { format, distanceInWordsStrict } from 'date-fns';
import fiLocale from 'date-fns/locale/fi';

const Events = styled.table`
  margin-top: 1em;
  min-width: 60%;
`;

const EventDate = styled.td`
  width: 6em;
`;

const Place = styled.span`
  font-style: italic;
`;

const Age = styled.td`
  width: 5em;
`;

const renderDate = date => date && (date.length === 4 ? date : format(date, 'DD.MM.YYYY'));
const renderAge = (birth, date) => ((birth === date || !date)
  ? null
  : distanceInWordsStrict(birth, date, { locale: fiLocale }));

export default ({ events, birth }) => (
  <Events>
    <tbody>
      {events.map(event => (
        <tr key={event.id}>
          <EventDate>{renderDate(event.date)}</EventDate>
          <Age>{event.type !== 'Birth' && renderAge(birth, event.date)}</Age>
          <td><Translate id={`events.${event.type}`} /></td>
          <td>{event.description}</td>
          <td>
            <Place>{event.place && event.place.name}</Place>
          </td>
        </tr>
      ))}
    </tbody>
  </Events>
);
