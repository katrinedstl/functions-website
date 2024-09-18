import { renderPage } from "./render-page";

export enum RenderHtmlOutcome {
  Failure = "failure",
  Success = "success",
}

export const renderHtml = async (
  data
): Promise<
  | { outcome: RenderHtmlOutcome.Success; value: string }
  | { outcome: RenderHtmlOutcome.Failure; value: string }
> => {
  try {
    const html = renderPage(data);

    return { outcome: RenderHtmlOutcome.Success, value: html };
  } catch (error) {
    return {
      outcome: RenderHtmlOutcome.Failure,
      value:
        error instanceof Error
          ? error.toString()
          : "Unknown error rendering HTML",
    };
  }
};
