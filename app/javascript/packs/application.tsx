import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter  } from "react-router-dom"
import App from '../components/App/index'

import "blueprint-css/src/blueprint"

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  , document.getElementById('app')
);

