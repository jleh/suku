import React from 'react';
import { Translate } from 'react-localize-redux';

import styles from './family.css';

import LinkedPerson from '../LinkedPerson';
import { renderDate } from '../../util';

const Family = ({ families, persons }) => (
  <div className={styles.family}>
    {families.map((family) => (
      <div key={family.spouse}>
        <Translate id="family.spouse" />:{' '}
        <LinkedPerson personRef={family.spouse} persons={persons} />
        <div className={styles.married}>
          &infin; {renderDate(family.marriage?.date)} {family.marriage?.place?.name}
        </div>
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

export default Family;
