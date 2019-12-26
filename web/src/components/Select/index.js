import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import { useField } from '@rocketseat/unform';

import { Container } from './styles';

export default function ReactSelect({
  name,
  label,
  options,
  multiple,
  value,
  ...rest
}) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  function parseSelectValue(selectRef) {
    const selectValue = selectRef.props.value;
    if (!multiple) {
      return selectValue ? selectValue.id : '';
    }

    return selectValue ? selectValue.map(option => option.id) : [];
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'state.value.id',
      parseValue: parseSelectValue,
      clearValue: selectRef => {
        selectRef.select.clearValue();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  function getDefaultValue() {
    if (!defaultValue) return null;

    if (!multiple) {
      return options.find(option => String(option.id) === defaultValue);
    }

    return options.filter(option => defaultValue.includes(option.id));
  }

  return (
    <Container>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <Select
        name={fieldName}
        aria-label={fieldName}
        options={options}
        isMulti={multiple}
        // defaultValue={}
        value={getDefaultValue()}
        ref={ref}
        getOptionValue={option => option.id}
        getOptionLabel={option => option.title}
        placeholder=""
        {...rest}
      />

      {error && <span>{error}</span>}
    </Container>
  );
}

ReactSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  multiple: PropTypes.bool,
};

ReactSelect.defaultProps = {
  multiple: false,
};
