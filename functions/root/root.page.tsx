import React from "react";

import type { Root as Props } from "./root.props";

const Root: React.FunctionComponent<Props> = ({ title }) => (
  <div className="root">
    <h1>{title}</h1>
  </div>
);

export default Root;
