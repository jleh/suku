import React from 'react';
import styled from 'styled-components';
import { Translate } from 'react-localize-redux';

import LinkedPerson from '../LinkedPerson';

const Family = styled.div`
  margin-top: 2em;
  margin-bottom: 1em;
`;

export default ({ families, persons }) => (
  <Family>
    {families.map(family => (
      <div key={family.spouse}>
        <Translate id="family.spouse" />: <LinkedPerson personRef={family.spouse} persons={persons} />
        <ol>
          {family.children.map((child, index) => (
            <li key={index}>
              <LinkedPerson personRef={child} persons={persons} />
            </li>
          ))}
        </ol>
      </div>
    ))}
  </Family>
);
