import React from 'react';
import PropTypes from 'prop-types';

import { CustomButton } from './styles';

export default function ButtonLink({ children, to, color, ...rest }) {
  return (
    <CustomButton to={to} color={color} {...rest}>
      <span>{children}</span>
    </CustomButton>
  );
}

ButtonLink.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,
  to: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

ButtonLink.defaultProps = {};
