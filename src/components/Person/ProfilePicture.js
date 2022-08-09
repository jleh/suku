import React from 'react';

import styles from './person.css';
import config from '../../../config.json';

const ProfilePicture = ({ person }) => (
  <div className={styles.picture}>
    {person.picture && <img src={`${config.picturesBasePath}/${person.picture}`} alt="Profile" />}
  </div>
);

export default ProfilePicture;
