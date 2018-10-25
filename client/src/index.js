// Data layer side - Redux side of things
import 'materialize-css/dist/css/materialize.min.css'
import React from 'react'
import ReactDOM from 'react-dom'

import Root from './Root'
import App from './components/App'

ReactDOM.render(
  <Root>
    <App />
  </Root>,
  document.querySelector('#root')
)
