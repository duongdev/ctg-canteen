import React from 'react'

import ReactHelmet, { HelmetProps } from 'react-helmet'

const Helmet: React.FC<HelmetProps> = (props) => (
  <ReactHelmet defer {...props} />
)

export default Helmet
