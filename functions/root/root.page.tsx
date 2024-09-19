import React, { useState } from 'react';

import Button from 'sats-ui-lib/react/button';
import Text from 'sats-ui-lib/react/text';

import Test from './components/test';

import type { Root as Props } from './root.props';

const Root: React.FunctionComponent<Props> = ({ button, test, title }) => {
  const [isTempted, setIsTempted] = useState(false);

  return (
    <main className="root">
      <Text
        elementName="h1"
        size={Text.sizes.headline1}
        theme={Text.themes.emphasis}
      >
        {title}
      </Text>
      <div>
        <Button
          {...button}
          variant={Button.variants.primary}
          onClick={() => setIsTempted(prevState => !prevState)}
        />
      </div>
      {isTempted ? <Test {...test} /> : null}
    </main>
  );
};

export default Root;
