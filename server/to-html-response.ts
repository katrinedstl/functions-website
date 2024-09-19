import { renderHtml, RenderHtmlOutcome } from './render-html';
import { createHttpResponse } from './response-helpers';

export const toHtmlResponse = async data => {
  const html = await renderHtml(data);

  switch (html.outcome) {
    case RenderHtmlOutcome.Failure: {
      return createHttpResponse({
        html: `<html>Well, this HTML did not render! 😵‍💫 Error: ${html.value}</html>`,
        status: 500,
      });
    }
    case RenderHtmlOutcome.Success: {
      return createHttpResponse({
        html: html.value,
      });
    }
  }
};
