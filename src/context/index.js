import React from 'react';

import PersonContext from './personContext';
import PlaceContext from './placeContext';

export default WrappedComponent => props => (
  <PersonContext.Consumer>
    {({
      personsById, personsByRef, personList, data, personSelected
    }) => (
      <PlaceContext.Consumer>
        {({ places, placesById, worldEvents }) => (
          <WrappedComponent
            {...props}
            personsById={personsById}
            personsByRef={personsByRef}
            personList={personList}
            places={places}
            placesById={placesById}
            data={data}
            personSelected={personSelected}
            worldEvents={worldEvents}
          />
        )}
      </PlaceContext.Consumer>
    )}
  </PersonContext.Consumer>
);
