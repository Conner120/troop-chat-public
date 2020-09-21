import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import App from './App';

window.api = "scouthub.conner.rocks";
ReactDOM.render( < App / > , document.getElementById('root'));

serviceWorker.unregister();