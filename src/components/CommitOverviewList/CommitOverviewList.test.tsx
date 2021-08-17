import React from 'react'
import { shallow } from 'enzyme'
import { CommitOverviewList } from './CommitOverviewList';
import { Context } from 'react';
import { Error } from '../Error/Error';
import { Skeleton } from '@material-ui/lab';
import { mockedCommits } from '../../services/CommitService.test';
import { CommitOverviewListItem } from '../CommitOverviewListItem/CommitOverviewListItem';
import { TranslationContext } from '../../hooks/TranslationContext';
import { ICommitProviderState } from '../../types/commits';

function createUseContextMockImplementation(value: ICommitProviderState) {
  return function (context: Context<any>) {
    if(context === TranslationContext) {
      return {
        translate: () => 'translated-string'
      }
    }

    return value;
  }
}

const useContextMock = jest.spyOn(React, 'useContext').mockImplementation(
  createUseContextMockImplementation({
    commits: [],
    error: '',
    since: '',
    setSince: () => {},
  })
)

describe('<CommitOverviewList />', () => {
  it('should render a skeleton / shimmer when there are no commits and no errors', () => {
    const component = shallow(<CommitOverviewList/>)
    expect(component.contains(<Skeleton variant="text" animation="wave" />)).toBe(true)
  })

  it('should render an error when there is an error', function () {
    const mockState = {
      commits: [],
      error: 'There has been a server error',
      since: '',
      setSince: () => {},
    }
    useContextMock.mockImplementation(createUseContextMockImplementation(mockState))
    const component = shallow(<CommitOverviewList/>)
    expect(component.find(Error)).toHaveLength(1);
  });

  it('should render the table when there\'s no error and commits available', function () {
    const mockState = {
      commits: mockedCommits,
      error: '',
      since: '',
      setSince: () => {},
    }
    useContextMock.mockImplementation(createUseContextMockImplementation(mockState))
    const component = shallow(<CommitOverviewList/>)
    expect(component.find(CommitOverviewListItem)).toHaveLength(mockedCommits.length);
  });
})
