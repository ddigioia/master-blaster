/* global it */

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Board from './Board'
import { mount, shallow } from 'enzyme'

it('renders without crashing', () => {
  mount(<App />) // renders component and children
})

it('renders Board component', () => {
  const app = mount(<App />)
  // const board = shallow(<Board />)
  // expect(app).toContainReact(board)
})
