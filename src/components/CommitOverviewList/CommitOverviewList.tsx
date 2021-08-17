import React, { FunctionComponent } from 'react';
import './CommitOverviewList.scss'
import { CommitContext } from '../../hooks/CommitContext';
import { Error } from '../Error/Error';
import { nowTimestamp } from '../../utils/date-time';
import { TableSkeleton } from '../Skeleton/Skeleton';
import { CommitOverviewTable } from '../CommitOverviewTable/CommitOverviewTable';

export const CommitOverviewList: FunctionComponent = (props) => {
  // using React.useContext here for easier mocking
  // https://github.com/enzymejs/enzyme/issues/2176#issuecomment-532361526
  const commitState = React.useContext(CommitContext);
  const { commits, error, setSince } = commitState;

  if(!error && commits.length === 0) {
    return <TableSkeleton/>
  }

  if(error) {
    // TODO translate
    return <Error
      message='Could not load data'
      action={setSince && setSince.bind(null, nowTimestamp())}
      actionLabel='Retry'
    />
  }
  // TODO add date selector

  return (
    <CommitOverviewTable/>
  )
}
