import React from 'react'
import { shallow } from 'enzyme'
import { OverviewPage } from './OverviewPage';
import { Context } from 'react';
import { Error } from '../../components/Error/Error';
import { mockedCommits } from '../../services/CommitService.test';
import { TranslationContext } from '../../hooks/TranslationContext';
import { ICommitProviderState } from '../../types/commits';
import { TableSkeleton } from '../../components/Skeleton/Skeleton';
import { CommitOverviewTable } from '../../components/CommitOverviewTable/CommitOverviewTable';

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

const initState = {
  commits: [],
  error: '',
  since: '',
  setSince: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
  numberOfPages: 20,
  until: '',
  fetching: false,
};

const useContextMock = jest.spyOn(React, 'useContext').mockImplementation(
  createUseContextMockImplementation(initState)
)

describe('<OverviewPage />', () => {
  it('should render a skeleton / shimmer when fetching is true', () => {
    const mockState = {
      ...initState,
      fetching: true
    }
    useContextMock.mockImplementation(createUseContextMockImplementation(mockState))
    const component = shallow(<OverviewPage/>)
    expect(component.contains(<TableSkeleton />)).toBe(true)
  })

  it('should render an error when there is an error', function () {
    const mockState = {
      ...initState,
      error: 'There has been a server error',
    }
    useContextMock.mockImplementation(createUseContextMockImplementation(mockState))
    const component = shallow(<OverviewPage/>)
    expect(component.find(Error)).toHaveLength(1);
  });

  it('should render the table when there\'s no error and commits available', function () {
    const mockState = {
      ...initState,
      commits: mockedCommits,
    }
    useContextMock.mockImplementation(createUseContextMockImplementation(mockState))
    const component = shallow(<OverviewPage/>)
    expect(component.find(CommitOverviewTable)).toHaveLength(mockedCommits.length);
  });
})