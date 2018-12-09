import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';

const shouldItemRender = (item, value) => {
  if (value.length < 3) {
    return false;
  }

  return item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
};

class PersonSearch extends Component {
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
    const { persons } = this.props;

    return (
      <Autocomplete
        getItemValue={person => person.id}
        items={persons}
        shouldItemRender={shouldItemRender}
        renderItem={(item, isHighlighted) => (
          <div key={item.id} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
            {item.name}
          </div>
        )}
        value={value}
        onChange={e => this.setState({ value: e.target.value })}
        inputProps={{
          placeholder: 'Henkilöhaku'
        }}
        onSelect={this.onSelect}
      />
    );
  }
}

export default PersonSearch;
