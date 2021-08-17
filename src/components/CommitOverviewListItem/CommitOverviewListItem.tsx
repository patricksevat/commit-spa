import React, { FunctionComponent } from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import './CommitOverviewListItem.scss'

export const CommitOverviewListItem: FunctionComponent<ICommitOverviewListItemProps> = ({ message, date, author}) => {
  return (
    <TableRow>
      <TableCell className={'commit-overview-list-item commit-overview-list-item__message'}>
        <div className={'commit-overview-list-item__message--ellipsis'} title={message}>{ message }</div>
      </TableCell>
      <TableCell className={'commit-overview-list-item'}>{ date || '' }</TableCell>
      <TableCell className={'commit-overview-list-item'}>{ author }</TableCell>
    </TableRow>
  )
}

interface ICommitOverviewListItemProps {
  message: string,
  date: string | undefined,
  author: string
}
