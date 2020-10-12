import React from "react";
import hoistStatics from "hoist-non-react-statics";
import invariant from "tiny-invariant";

import StackEventsContext from "./StackEventsContext.js";

/**
 * A public higher-order component to access the imperative API
 */
function withStackEvents(Component) {
  const displayName = `withStackEvents(${Component.displayName || Component.name})`;

  const C = props => {
    return (
      <StackEventsContext.Consumer>
        {context => {
          invariant(
            context,
            `You should not use <${displayName} /> outside a <StackEvents>`
          );
          return (
            <Component
              {...props}
              {...context}
            />
          );
        }}
      </StackEventsContext.Consumer>
    );
  };

  C.displayName = displayName;

  return hoistStatics(C, Component);
}

export default withStackEvents;
