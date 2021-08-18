import React, { FunctionComponent, useContext } from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import './CommitOverviewListItem.scss'
import { useHistory } from 'react-router-dom';
import { IFormattedCommit } from '../../types/commits';
import { CommitContext } from '../../hooks/CommitContext';

export const CommitOverviewListItem: FunctionComponent<ICommitOverviewListItemProps> = ({ commit }) => {
  const history = useHistory();
  const { setSelectedCommit } = useContext(CommitContext)

  const sha = commit.sha;
  const message= commit.commit.message
  const date= commit.commit.author.formattedDate
  const author= commit.commit.author.name

  function handleRowClick() {
    setSelectedCommit && setSelectedCommit(commit);
    history.push(`/commit/${sha}`)
  }

  return (
    <TableRow className={'commit-overview-list-item'} onClick={handleRowClick}>
      <TableCell className={'commit-overview-list-item__message'}>
        <div className={'commit-overview-list-item__message--ellipsis'} title={message}>{ message }</div>
      </TableCell>
      <TableCell className={'commit-overview-list-item__date'}>{ date || '' }</TableCell>
      <TableCell className={'commit-overview-list-item__author'}>{ author }</TableCell>
    </TableRow>
  )
}

interface ICommitOverviewListItemProps {
  commit: IFormattedCommit
}
