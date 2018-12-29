import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Translate } from 'react-localize-redux';
import sortBy from 'lodash/sortBy';

const Places = ({ places }) => (
  <div>
    <h2><Translate id="menu.places" /></h2>
    {sortBy(places, 'name').map(place => (
      <div key={place.id}>
        <Link to={`/place/${place.id}`}>
          {place.name}
        </Link>
      </div>
    ))}
  </div>
);

const mapStateToProps = ({ places }) => ({
  places: places.places
});

export default connect(mapStateToProps)(Places);
