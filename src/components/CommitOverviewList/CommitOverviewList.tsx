import React, { FunctionComponent } from 'react';
import './CommitOverviewList.scss'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { StateContext } from '../../hooks/StateContext';
import { CommitOverviewListItem } from '../CommitOverviewListItem/CommitOverviewListItem';
import { Error } from '../Error/Error';
import { nowTimestamp } from '../../utils/date-time';
import { Skeleton } from '@material-ui/lab';
import { TranslationContext } from '../../hooks/TranslationContext';

export const CommitOverviewList: FunctionComponent = (props) => {
  const { translate } = React.useContext(TranslationContext);

  // using React.useContext here for easier mocking
  // https://github.com/enzymejs/enzyme/issues/2176#issuecomment-532361526
  const commitState = React.useContext(StateContext);
  const { commits, error, setSince } = commitState;

  if(!error && commits.length === 0) {
    return (
      <>
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="rect" height={400} animation="wave" />
      </>
    )
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
    <TableContainer id='commit-overview-table' component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              { translate('message') }
            </TableCell>
            <TableCell>
              { translate('date') }
            </TableCell>
            <TableCell>
              { translate('author') }
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {commits.map((commit) => <CommitOverviewListItem key={commit.sha} message={commit.commit.message} date={commit.commit.author.date} author={commit.author.login}/>)}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
