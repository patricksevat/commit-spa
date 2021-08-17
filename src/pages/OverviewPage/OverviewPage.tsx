import React, { FunctionComponent } from 'react';
import { CommitOverviewList } from '../../components/CommitOverviewList/CommitOverviewList';

export const OverviewPage: FunctionComponent = (props) => {
  return (
    <>
      {/* TODO remove CommitOverviewList and move it here */}
      <CommitOverviewList/>
      { props.children }
    </>
  )
};
