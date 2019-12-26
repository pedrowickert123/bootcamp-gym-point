import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function HeaderPage({ children }) {
  return <Container>{children}</Container>;
}

HeaderPage.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,
};

HeaderPage.defaultProps = {};
