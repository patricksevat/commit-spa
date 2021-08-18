import React, { FunctionComponent } from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import './CommitOverviewListItem.scss'
import { useHistory } from 'react-router-dom';

export const CommitOverviewListItem: FunctionComponent<ICommitOverviewListItemProps> = ({ message, date, author, sha}) => {
  const history = useHistory();

  return (
    <TableRow className={'commit-overview-list-item'} onClick={() => history.push(`/commit/${sha}`)}>
      <TableCell className={'commit-overview-list-item__message'}>
        <div className={'commit-overview-list-item__message--ellipsis'} title={message}>{ message }</div>
      </TableCell>
      <TableCell className={'commit-overview-list-item__date'}>{ date || '' }</TableCell>
      <TableCell className={'commit-overview-list-item__author'}>{ author }</TableCell>
    </TableRow>
  )
}

interface ICommitOverviewListItemProps {
  sha: string,
  message: string,
  date: string | undefined,
  author: string
}
