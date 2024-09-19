import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Html from '../client/html';
import type { Html as HtmlProps } from '../client/html.types';
import { scriptUrls, styleUrls } from './client-manifest';

export const renderPage = <T extends object>({
  component,
  componentName,
  props,
  title,
}: {
  component: any;
  componentName: string;
  props: T;
  title;
}) => {
  const htmlProps: HtmlProps = {
    attributes: {
      'data-component-name': componentName,
      'data-rendered-at': String(Date.now()),
    },
    props,
    css: styleUrls,
    componentName,
    js: scriptUrls(componentName),
    title,
  };

  const element = React.createElement(
    Html,
    htmlProps,
    React.createElement(component, props),
  );

  return `<!doctype html>${ReactDOMServer.renderToString(element)}`;
};
