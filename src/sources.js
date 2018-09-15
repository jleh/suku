import React, { Fragment } from 'react';
import { Translate } from 'react-localize-redux';

const getSourceText = source => (
  <Fragment>
    <i>{source.author}</i> {source.title} {source.page}
  </Fragment>
);

const renderSourceLink = source => (
  <a href={source.url} target="_blank" rel="noopener noreferrer">
    {getSourceText(source)}
  </a>
);

const renderSource = source => (
  <div key={`${source.title}-${source.page}`}>
    {source.url ? renderSourceLink(source) : getSourceText(source)}
  </div>
);

export default ({ sources }) => sources && (
  <div className="sources">
    <div><Translate id="sources" />:</div>
    {sources.map(renderSource)}
  </div>
);
