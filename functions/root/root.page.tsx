import React from 'react';

import Text from 'sats-ui-lib/react/text';

import type { Root as Props } from './root.props';

const Root: React.FunctionComponent<Props> = ({ title }) => (
  <div className="root">
    <Text
      elementName="h1"
      size={Text.sizes.headline1}
      theme={Text.themes.emphasis}
    >
      {title}
    </Text>
  </div>
);

export default Root;
