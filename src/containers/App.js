import React, { Component } from 'react'
import { Provider } from 'react-redux'
import '../styles/App.css'
import Board from './Board'
import appStore from '../store/appStore'

// use named export here for tests
class App extends Component {
  constructor (props) {
    super()
  }

  render () {
    return (
      <Provider store={appStore}>
        <div className='App'>
          <Board />
        </div>
      </Provider>
    )
  }
}

export default App