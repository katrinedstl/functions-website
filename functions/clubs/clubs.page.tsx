import React from 'react';

import Text from 'sats-ui-lib/react/text';

import type { Root as Props } from './clubs.props';

const Root: React.FunctionComponent<Props> = ({ text, title }) => (
  <main className="root">
    <Text
      elementName="h1"
      size={Text.sizes.headline1}
      theme={Text.themes.emphasis}
    >
      {title}
    </Text>
    <Text elementName="p" size={Text.sizes.basic}>
      {text}
    </Text>
  </main>
);

export default Root;
