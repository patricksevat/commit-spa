import React from 'react'
import { shallow } from 'enzyme'
import { AppLayout } from './AppLayout'
import { languageContextMock } from '../utils/mocks'
import { IconButton, Select } from '@material-ui/core'
import { useLocation } from 'react-router-dom'

const useContextMock = jest.spyOn(React, 'useContext').mockImplementation(() => languageContextMock)

jest.mock('react-router-dom', () => {
  return {
    useLocation: jest.fn().mockReturnValue({ pathname: '/' }),
    useHistory: jest.fn().mockReturnValue({ push: jest.fn() }),
  }
})

describe('<AppLayout>', function () {
  it('should call set language when selecting a language', function () {
    const component = shallow(<AppLayout />)
    const select = component.find(Select)
    select.simulate('change', { target: { value: 'foo-bar' } })
    expect(languageContextMock.setLanguage).toHaveBeenCalledTimes(1)
  })

  it('should not show a back button when the location is "/"', function () {
    const component = shallow(<AppLayout />)
    expect(component.find(IconButton)).toHaveLength(0)
  })

  it('should show a back button when the location is not "/"', function () {
    ;(useLocation as jest.Mock).mockReturnValueOnce({ pathname: '/commit/id123 ' })
    const component = shallow(<AppLayout />)
    expect(component.find(IconButton)).toHaveLength(1)
  })
})
