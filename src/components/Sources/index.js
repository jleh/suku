import React from 'react';
import { Translate } from 'react-localize-redux';

import styles from './sources.css';

const getSourceText = (source) => (
  <>
    <i>{source.author}</i> {source.title} <Translate id="page" /> {source.page}
  </>
);

const renderSourceLink = (source) => (
  <a href={source.url} target="_blank" rel="noopener noreferrer">
    {getSourceText(source)}
  </a>
);

const renderSource = (source, index) => (
  <div key={`${source.title}-${source.page}`}>
    {index + 1}. {source.url ? renderSourceLink(source) : getSourceText(source)}
  </div>
);

const Sources = ({ sources }) =>
  sources && (
    <div className={styles.sources}>
      <h3>
        <Translate id="sources" />
      </h3>
      {sources.map(renderSource)}
    </div>
  );

export default Sources;
