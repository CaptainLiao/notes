
import { render } from 'react-dom'

import './style/common.scss'

import routers from './router/index'
import { AppContainer } from 'react-hot-loader'

render(
  routers,
  document.getElementById('app')
);

