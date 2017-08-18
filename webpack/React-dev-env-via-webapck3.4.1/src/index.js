

import React from 'react'
import { render } from 'react-dom'
import App from './App'
import { AppContainer } from 'react-hot-loader'
import './index.scss'

const renderCom = Component => {
  render(
  <AppContainer>
    <Component />
  </AppContainer>,
  document.getElementById('app')
  )
}

renderCom(App)

if (module.hot) {
  module.hot.accept('./App', () => { renderCom(App) })
}

// render(
//   <App />,
//   document.getElementById('app')
// )