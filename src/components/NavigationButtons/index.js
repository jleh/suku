import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-localize-redux';

const NavigationButtons = ({ history }) => {
  const goBack = () => history.goBack();

  return (
    <div>
      <button type="button" onClick={goBack}>
        <Translate id="back" />
      </button>
      <Link to="/">
        <button type="button">
          <Translate id="frontPage" />
        </button>
      </Link>
    </div>
  );
};

export default NavigationButtons;
