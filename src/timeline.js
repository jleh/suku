import React from 'react';
import sortBy from 'lodash/sortBy';
import uniq from 'lodash/uniq';

const toSortDate = (textDate) => {
  const date = textDate.replace(/\?/g, '0');

  if (date.length === 10) {
    const fields = date.split('.');
    return `${fields[2]}-${fields[1]}-${fields[0]}`;
  }

  return date;
};

const getYear = date => date.substring(date.length - 4);
const getDayAndMonth = date => (date.length > 4 ? date.substring(0, 5) : '');

const getEvents = (data) => {
  if (!data || !data.events) {
    return [];
  }

  const events = [];

  if (data.events.birth) {
    events.push({
      text: `${data.name} syntyi`,
      sortDate: toSortDate(data.events.birth),
      date: data.events.birth,
      displayDate: getDayAndMonth(data.events.birth),
      year: getYear(data.events.birth)
    });
  }

  if (data.events.death) {
    events.push({
      text: `${data.name} kuoli`,
      sortDate: toSortDate(data.events.death),
      date: data.events.death,
      displayDate: getDayAndMonth(data.events.death),
      year: getYear(data.events.death)
    });
  }

  return [
    ...events,
    ...getEvents(data.parents[0]),
    ...getEvents(data.parents[1])
  ];
};

const getYears = events => uniq(events.map(event => getYear(event.date))).sort();

const Timeline = ({ data, worldEvents }) => {
  const events = sortBy(getEvents(data), 'sortDate');
  const years = getYears(events);

  return (
    <div>
      <h2>Aikajana</h2>
      {years.map(year => (
        <div key={year}>
          <h4>{year}</h4>
          <div className="timeline-events">
            <div className="family-events">
              {events.filter(event => event.year === year).map(event => (
                <div key={`${event.date}-${event.text}`}>
                  <div className="timeline-date">{event.displayDate}</div>
                  <div className="timeline-text">{event.text}</div>
                </div>
              ))}
            </div>
            <div className="world-events">
              {worldEvents[year] && worldEvents[year].map(event => (
                <div key={`${year}-${event}`}>{event}</div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
