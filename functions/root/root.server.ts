import type { HttpHandler } from '@azure/functions';
import { app } from '@azure/functions';

import { toHtmlResponse } from '../../server/to-html-response';

import Root from './root.page';
import { texts } from './root.texts';

const handler: HttpHandler = async (_request, _context) => {
  return toHtmlResponse({
    component: Root,
    componentName: 'Root',
    title: texts.title,
    props: {
      title: texts.title,
    },
  });
};

app.http('root', {
  handler,
  methods: ['GET'],
  route: '/',
});
