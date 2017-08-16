import React from 'react'
import { render } from 'react-dom'
import App from './App'
import './style/common.scss'

import routers from './router/index'

render(
  routers(),
  document.getElementById('app')
);