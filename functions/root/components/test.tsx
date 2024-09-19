import React from 'react';

import Text from 'sats-ui-lib/react/text';

import type { Test as Props } from './test.props';

const Test: React.FunctionComponent<Props> = ({ text }) => (
  <Text className="root__test" size={Text.sizes.basic}>
    {text}
  </Text>
);

export default Test;
