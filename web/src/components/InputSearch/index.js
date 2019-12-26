import React from 'react';
import PropTypes from 'prop-types';
import { MdSearch } from 'react-icons/md';
import { debounce } from 'lodash';

import { Container, Input } from './styles';

export default function InputSearch({ handleSearch, debounceTime, ...rest }) {
  const search = debounce(value => handleSearch(value), debounceTime);

  function handleChange(e) {
    search(e.target.value);
  }

  return (
    <Container>
      <MdSearch size={16} />
      <Input onChange={e => handleChange(e)} {...rest} />
    </Container>
  );
}

InputSearch.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  debounceTime: PropTypes.number,
};

InputSearch.defaultProps = {
  debounceTime: 500,
};
