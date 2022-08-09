import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';

import styles from './search.css';

const shouldItemRender = (item, value) => {
  if (value.length < 3) {
    return false;
  }

  return item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
};

const renderPerson = (item, isHighlighted) => (
  <div key={item.id} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
    <div>{item.name}</div>
    <div className={styles.dates}>
      <div>
        {item.events.birth}
        {item.events.death && ' - '}
        {item.events.death}
      </div>
    </div>
  </div>
);

const renderPlace = (item, isHighlighted) => (
  <div key={item.id} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
    <div>{item.name}</div>
  </div>
);

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = { value: '' };

    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(value) {
    const { onSelect } = this.props;

    this.setState({ value: '' });
    onSelect(value);
  }

  render() {
    const { value } = this.state;
    const { persons, places } = this.props;

    return (
      <Autocomplete
        getItemValue={(person) => person.id}
        items={[...persons, ...places.values()]}
        shouldItemRender={shouldItemRender}
        renderItem={(item, isHighlighted) => {
          if (item.id.charAt(0) === 'I') return renderPerson(item, isHighlighted);
          return renderPlace(item, isHighlighted);
        }}
        value={value}
        onChange={(e) => this.setState({ value: e.target.value })}
        inputProps={{ placeholder: 'Haku' }}
        onSelect={this.onSelect}
      />
    );
  }
}

export default Search;
