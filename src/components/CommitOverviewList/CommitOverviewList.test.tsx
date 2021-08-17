import React from 'react'
import { shallow } from 'enzyme'
import { CommitOverviewList } from './CommitOverviewList';
import { Context } from 'react';
import { Error } from '../Error/Error';
import { mockedCommits } from '../../services/CommitService.test';
import { TranslationContext } from '../../hooks/TranslationContext';
import { ICommitProviderState } from '../../types/commits';
import { TableSkeleton } from '../Skeleton/Skeleton';
import { CommitOverviewTable } from '../CommitOverviewTable/CommitOverviewTable';

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
    expect(component.contains(<TableSkeleton />)).toBe(true)
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
    expect(component.find(CommitOverviewTable)).toHaveLength(mockedCommits.length);
  });
})
