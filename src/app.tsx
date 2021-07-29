import * as React from "react";
import * as ReactDOM from "react-dom";
import { Main } from '@/components/main'
import APP from '@/config/APP'

document.title = APP.name;
function render() {
  ReactDOM.render(<Main />, document.getElementById('root'));
}

render();
