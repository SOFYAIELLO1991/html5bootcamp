import React from 'react';
import PropTypes from 'prop-types';

import './hello-yt.scss';

const HelloYT = ({ title }) => <div className="hello-yt">{title}</div>;

HelloYT.propTypes = {
  title: PropTypes.string,
};

HelloYT.defaultProps = {
  title: 'Default Title',
};

export default HelloYT;
