import { basename } from "path";
import manifest from "./client-manifest.json";

function pascalToParamCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase()
    .replace(/^-/, "");
}

const toUrl = ([, url]: [unknown, string]) => `/${url}`;
const scripts = Object.entries(manifest).filter(([key]) =>
  key.match(/^functions.*\.client\.ts/)
);
/** Returns only script URLs applicable to the component whose name matches `componentName` */
export const scriptUrls = (componentName: string) => {
  return scripts
    .filter(([source]) => {
      const base = basename(source);
      return pascalToParamCase(componentName) === base.split(".", 1)[0];
    })
    .map(toUrl);
};
export const styleUrls = Object.entries(manifest)
  .filter(([, url]) => url.endsWith(".css"))
  .map(toUrl);
