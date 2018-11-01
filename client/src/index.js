// Data layer side - Redux side of things
import 'materialize-css/dist/css/materialize.min.css'
import React from 'react'
import ReactDOM from 'react-dom'

import Root from './Root'
import App from './components/App'

// TEMP /////////////////
import axios from 'axios'
window.axios = axios
/////////////////////////

ReactDOM.render(
  <Root>
    <App />
  </Root>,
  document.querySelector('#root')
)
