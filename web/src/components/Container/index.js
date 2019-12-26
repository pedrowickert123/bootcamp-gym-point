import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './styles';

export default function Container({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

Container.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,
};

Container.defaultProps = {};
