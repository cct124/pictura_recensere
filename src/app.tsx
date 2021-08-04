import * as React from "react";
import * as ReactDOM from "react-dom";
import Root from '@/components/Root'
import APP from '@/config/APP'

document.title = APP.name;
function render() {
  ReactDOM.render(<Root />, document.getElementById('root'));
}

render();
