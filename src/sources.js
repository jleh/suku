import React from 'react';

export default ({ sources }) => sources && (
  <div className="sources">
    <div>Lähteet:</div>
    {sources.map(source => (
      <div key={`${source.title}-${source.page}`}>
        <i>{source.author}</i> {source.title} {source.page}
      </div>
    ))}
  </div>
);
