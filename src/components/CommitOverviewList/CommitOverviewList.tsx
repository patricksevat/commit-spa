import React, { FunctionComponent } from 'react';
import './CommitOverviewList.scss'
import { CommitContext } from '../../hooks/CommitContext';
import { Error } from '../Error/Error';
import { nowTimestamp } from '../../utils/date-time';
import { TableSkeleton } from '../Skeleton/Skeleton';
import { CommitOverviewTable } from '../CommitOverviewTable/CommitOverviewTable';
import { TranslationContext } from '../../hooks/TranslationContext';

export const CommitOverviewList: FunctionComponent = (props) => {
  // using React.useContext here for easier mocking
  // https://github.com/enzymejs/enzyme/issues/2176#issuecomment-532361526
  const commitState = React.useContext(CommitContext);
  const { fetching, error, setSince } = commitState;
  const { translate } = React.useContext(TranslationContext);

  if(fetching) {
    return <TableSkeleton/>
  }

  if(error) {
    return <Error
      message={ translate('errorLoadingData')}
      action={setSince && setSince.bind(null, nowTimestamp())}
      actionLabel='Retry'
    />
  }

  return (
    <CommitOverviewTable/>
  )
}
