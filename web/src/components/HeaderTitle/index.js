import React from 'react';
import PropTypes from 'prop-types';

import { Title } from './styles';

export default function HeaderTitle({ title }) {
  return <Title>{title}</Title>;
}

HeaderTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

HeaderTitle.defaultValues = {
  title: '',
};
