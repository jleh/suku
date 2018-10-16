import React from 'react';

export default React.createContext({
  personsById: new Map(),
  personsByRef: new Map()
});
