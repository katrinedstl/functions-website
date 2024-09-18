import { createElement, type FunctionComponent } from "react";
import { hydrateRoot } from "react-dom/client";

export const hydrate = <T extends FunctionComponent>(
  component: T,
  componentName: string
) => {
  const mountNode = document.querySelector(`[mount-point="${componentName}"]`);
  if (!mountNode) {
    return;
  }

  const propsNode = document.querySelector(`[data-props="${componentName}"]`);

  if (!propsNode) {
    return;
  }

  const props = propsNode.textContent;
  if (!props) {
    return;
  }

  hydrateRoot(mountNode, createElement(component, JSON.parse(props)));
  document.documentElement.setAttribute("data-hydrated", `${Date.now()}`);
};
