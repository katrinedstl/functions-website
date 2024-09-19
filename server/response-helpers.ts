import { HttpResponse } from '@azure/functions';

export const createHttpResponse = ({
  html,
  status = 200,
}: {
  html: string;
  status?: number;
}) =>
  new HttpResponse({
    body: html,
    headers: {
      'Cache-Control': 'no-store',
      'Content-Type': 'text/html',
    },
    status,
  });
