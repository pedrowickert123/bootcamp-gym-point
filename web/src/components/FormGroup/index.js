import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function FormRow({ children }) {
  return <Container>{children}</Container>;
}

FormRow.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,
};
