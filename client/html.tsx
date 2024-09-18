import React from "react";
import serialize from "serialize-javascript";

import type { Html as Props } from "./html.types";

const Html: React.FC<React.PropsWithChildren<Props>> = ({
  attributes,
  children,
  componentName,
  css = [],
  js = [],
  props,
  title,
}) => (
  <html lang="en" {...attributes}>
    <head>
      {css.map((file) => (
        <link key={file} rel="stylesheet" href={file} />
      ))}
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <title>{title}</title>
    </head>
    <body>
      <div mount-point={componentName}>{children}</div>
      <script
        dangerouslySetInnerHTML={{
          __html: serialize(props, { isJSON: true }),
        }}
        data-props={componentName}
        type="application/json"
      />
      {js.map((file) => (
        <script key={file} src={file} />
      ))}
    </body>
  </html>
);

export default Html;
