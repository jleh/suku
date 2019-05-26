import React from 'react';

import styles from './person.css';
import config from '../../../config.json';

export default ({ coatOfArms }) => {
  if (!coatOfArms) {
    return null;
  }

  return (
    <div className={styles.coatOfArms}>
      <img src={`${config.coatOfArmsBasePath}/${coatOfArms}.svg`} alt="Suvun vaakuna" />
    </div>
  );
};
