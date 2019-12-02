import React from 'react';

import AncestorTree from '../AncestorTree';

const FrontPage = ({ data, personSelected }) => (
  <div>
    Siirry alemmas nähdäksesi puun juuren.
    <AncestorTree
      data={data}
      personSelected={personSelected}
    />
  </div>
);

export default FrontPage;
