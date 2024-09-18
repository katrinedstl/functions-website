export type Html = {
  attributes: Record<string, string>;
  componentName: string;
  css?: string[];
  js?: string[];
  props?: object;
  title: string;
};
