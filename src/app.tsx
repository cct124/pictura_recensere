import * as React from "react";
import * as ReactDOM from "react-dom";

declare global {
  interface Window {
    electron: {
      doThing(): void;
    };
  }
}

function render() {
  ReactDOM.render(<h2 className="red">Hello from React!</h2>, document.getElementById('root'));
}

render();
