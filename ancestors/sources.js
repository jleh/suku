const citationUrl = (citation) => {
  if (!citation.srcattribute) {
    return null;
  }

  const url = citation.srcattribute.find(src => src.$.type === 'web');

  return url ? url.$.value : null;
};

const findCitationAndSource = (ref, database) => {
  const citation = database.citations[0].citation.find(c => c.$.handle === ref);
  const source = database.sources[0].source.find(s => s.$.handle === citation.sourceref[0].$.hlink);

  const url = citation && citationUrl(citation);

  return {
    page: citation && citation.page ? citation.page[0] : '',
    title: source.stitle[0],
    author: source.sauthor ? source.sauthor[0] : null,
    url
  };
};

const findSources = (person, database) => {
  if (!person.citationref) {
    return [];
  }

  return person.citationref
    .map(citation => citation.$.hlink)
    .map(ref => findCitationAndSource(ref, database));
};

module.exports = findSources;
