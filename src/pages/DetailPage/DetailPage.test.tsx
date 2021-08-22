import React from 'react';
import { shallow } from 'enzyme';
import { DetailPage } from './DetailPage';
import { Error } from '../../components/Error/Error';
import { createUseContextMockImplementation, initCommitProviderState, mockedCommits } from '../../utils/mocks';
import { CommitDetailCard } from '../../components/CommitDetailCard/CommitDetailCard';

const useContextMock = jest.spyOn(React, 'useContext').mockImplementation(
  createUseContextMockImplementation(initCommitProviderState)
)

describe('<DetailPage>', function () {
  it('should render an error when there\'s no selectedCommit', function () {
    const component = shallow(<DetailPage/>)
    expect(component.find(Error)).toHaveLength(1);
  });

  it('should render a CommitDetailCard when selectedCommit is available', function () {
    useContextMock.mockImplementation(createUseContextMockImplementation({
      ...initCommitProviderState,
      selectedCommit: mockedCommits[0],
    }))
    const component = shallow(<DetailPage/>)
    expect(component.find(Error)).toHaveLength(0);
    expect(component.find(CommitDetailCard)).toHaveLength(1);
  });
});
