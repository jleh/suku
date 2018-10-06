import React from 'react';
import { Translate } from 'react-localize-redux';

import styles from './family.css';

import LinkedPerson from '../LinkedPerson';

export default ({ families, persons }) => (
  <div className={styles.family}>
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
  </div>
);
