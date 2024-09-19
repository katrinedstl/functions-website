import type { HttpHandler } from '@azure/functions';
import { app } from '@azure/functions';

import { toHtmlResponse } from '../../server/to-html-response';

import Clubs from './clubs.page';
import { texts } from './clubs.texts';
import type { Root as Props } from './clubs.props';

const handler: HttpHandler = async (_request, _context) => {
  const props: Props = {
    text: texts.text,
    title: texts.title,
  };

  return toHtmlResponse({
    component: Clubs,
    componentName: 'Clubs',
    title: texts.title,
    props,
  });
};

app.http('clubs', {
  handler,
  methods: ['GET'],
  route: 'clubs',
});
