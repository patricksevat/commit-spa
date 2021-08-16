import React, { FunctionComponent, useContext } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { StateContext } from '../../hooks/StateContext';
import { CommitOverviewListItem } from '../CommitOverviewListItem/CommitOverviewListItem';

export const CommitOverviewList: FunctionComponent = (props) => {
  const commitState = useContext(StateContext);
  const commits = commitState.commits;

  // TODO add error message
  // TODO add date selector

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Message
            </TableCell>
            <TableCell>
              Date
            </TableCell>
            <TableCell>
              Author
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
