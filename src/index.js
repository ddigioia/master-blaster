import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './styles/index.css'
import App from './containers/App'
import registerServiceWorker from './registerServiceWorker'
import appStore from './store/appStore'

ReactDOM.render(
  <Provider store={appStore}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
