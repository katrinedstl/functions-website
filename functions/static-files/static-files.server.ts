import { type HttpRequest, HttpResponse, app } from '@azure/functions';
import { promises as fsp } from 'fs';
import path from 'path';

const toLocalUrl = (input: HttpRequest | string, removeSearch?: boolean) => {
  const url = new URL(
    typeof input === 'string' ? input : input.url,
    'https://example.com',
  );

  if (removeSearch) {
    url.search = '';

    return url.pathname;
  }

  return `${url.pathname}${url.search}`;
};

const fileContentTypes: Record<string, string> = {
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.map': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.woff': 'application/octet-stream',
  '.woff2': 'application/octet-stream',
  '.xml': 'application/xml',
};

const getFile = async (
  request: HttpRequest,
): Promise<[fileContent: Buffer, fileSize: string, mimeType: string] | []> => {
  const publicDirectoryPath = path.join(process.cwd(), 'public');
  const filePath = path.resolve(
    path.join(
      publicDirectoryPath,
      toLocalUrl(request.url).replace(/^\/public/, ''),
    ),
  );

  if (!filePath.startsWith(publicDirectoryPath)) {
    // NOTE: Someone might be trying to read files from
    // other directories by requesting things with
    // f.ex `..` in the path.
    return [];
  }

  try {
    const [data, { size }] = await Promise.all([
      fsp.readFile(filePath),
      fsp.stat(filePath),
    ]);

    // NOTE: Ref. RFC 2046 4.5.1 'application/octet-stream' is correct for unknown types.
    return [
      data,
      String(size),
      fileContentTypes[path.extname(filePath)] || 'application/octet-stream',
    ];
  } catch {
    return [];
  }
};

app.http('static-files', {
  handler: async request => {
    const [data, size, type] = await getFile(request);
    if (data && size && type) {
      return new HttpResponse({
        body: data,
        headers: {
          'Cache-Control': 'public, max-age=31556926',
          'Content-Length': size,
          'Content-Type': type,
        },
        status: 200,
      });
    }

    return new HttpResponse({ status: 404 });
  },
  methods: ['GET'],
  route: 'public/{*path}',
});
