import React, { FunctionComponent } from 'react';
import { TableCell, TableRow } from '@material-ui/core';

export const CommitOverviewListItem: FunctionComponent<ICommitOverviewListItemProps> = ({ message, date, author}) => {
  return (
    <TableRow>
      <TableCell>{ message }</TableCell>
      <TableCell>{ date || '' }</TableCell>
      <TableCell>{ author }</TableCell>
    </TableRow>
  )
}

interface ICommitOverviewListItemProps {
  message: string,
  date: string | undefined,
  author: string
}
