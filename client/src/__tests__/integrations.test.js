import React from 'react'
import { mount } from 'enzyme'
import moxios from 'moxios'

import Root from '../Root'
import App from '../components/App'

// want to user moxios for api calls
beforeEach(() => {
  moxios.install()
})

afterEach(() => {
  moxios.uninstall()
})
