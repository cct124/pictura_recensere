import * as React from "react";
import * as ReactDOM from "react-dom";
import './style.scss';

function render() {
  ReactDOM.render(<h2 className="red">Hello from React!</h2>, document.getElementById('root'));
}

render();
