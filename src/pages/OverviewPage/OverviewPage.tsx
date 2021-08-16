import React, { FunctionComponent } from 'react';
import { CommitOverviewList } from '../../components/CommitOverviewList/CommitOverviewList';

export const OverviewPage: FunctionComponent = (props) => {
  return (
    <>
      <p>Overview</p>
      <CommitOverviewList/>
      { props.children }
    </>
  )
};
