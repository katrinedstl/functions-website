import type { HttpHandler } from '@azure/functions';
import { app } from '@azure/functions';

import { toHtmlResponse } from '../../server/to-html-response';

import Root from './root.page';
import { texts } from './root.texts';
import type { Root as Props } from './root.props';

const handler: HttpHandler = async (_request, _context) => {
  const props: Props = {
    title: texts.title,
    button: {
      text: texts.temptingButton,
    },
    test: {
      text: texts.temptingText,
    },
  };

  return toHtmlResponse({
    component: Root,
    componentName: 'Root',
    title: texts.title,
    props,
  });
};

app.http('root', {
  handler,
  methods: ['GET'],
  route: '/',
});
