import React from 'react';

import styles from './person.css';
import config from '../../../config.json';

export default ({ person }) => (
  <div className={styles.picture}>
    {person.picture
      && <img src={`${config.picturesBasePath}/${person.picture}`} alt="Profile" />
    }
  </div>
);
