import React from 'react';

import AncestorTree from '../AncestorTree';

const FrontPage = ({ personSelected }) => (
  <div>
    Siirry alemmas nähdäksesi puun juuren.
    <AncestorTree personSelected={personSelected} />
  </div>
);

export default FrontPage;
