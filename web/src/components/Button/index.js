import React from 'react';
import PropTypes from 'prop-types';

import { CustomButton } from './styles';

export default function Button({ children, color, type, ...rest }) {
  return (
    <CustomButton color={color} type={type} {...rest}>
      <span>{children}</span>
    </CustomButton>
  );
}

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,
  type: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

Button.defaultProps = {};
