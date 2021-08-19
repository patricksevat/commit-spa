import React, { FunctionComponent, useContext } from 'react';
import { Avatar, Card, CardContent, CardHeader, Divider, IconButton, Typography } from '@material-ui/core';
import { OpenInNew } from '@material-ui/icons';
import { CommitContext } from '../../hooks/CommitContext';

export const CommitDetailCard: FunctionComponent = () => {
  const { selectedCommit } = useContext(CommitContext);

  const message= selectedCommit?.commit.message
  const date= selectedCommit?.commit.author.formattedDate
  const author= selectedCommit?.author.login
  const avatar= selectedCommit?.author.avatar_url

  function handleIconButtonClick() {
    window.open(selectedCommit?.html_url, '_blank')
  }

  return (
    <Card className='detail-card'>
      <CardHeader
        title={author}
        subheader={date}
        avatar={
          <Avatar alt={author} src={avatar}/>
        }
        action={
          <IconButton aria-label="settings" onClick={handleIconButtonClick}>
            <OpenInNew/>
          </IconButton>
        }
      />
      <CardContent>
        <Typography variant='body2'>
          { message }
        </Typography>
        <Divider className='detail-card__divider'/>
        <Typography variant='caption'>
          SHA: {selectedCommit?.sha}
        </Typography>
      </CardContent>
    </Card>
  )
}
