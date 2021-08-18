import React, { FunctionComponent, useContext } from 'react';
import { CommitContext } from '../../hooks/CommitContext';
import { Error } from '../../components/Error/Error';
import { TranslationContext } from '../../hooks/TranslationContext';
import { useHistory } from 'react-router-dom';
import { Avatar, Card, CardContent, CardHeader, Divider, IconButton, Typography } from '@material-ui/core';
import { OpenInNew } from '@material-ui/icons';
import './DetailPage.scss'

export const DetailPage: FunctionComponent = () => {
  const history = useHistory();
  const { selectedCommit } = useContext(CommitContext);
  const { translate } = useContext(TranslationContext);

  if(!selectedCommit) {
    return (
      <Error
        message={translate('noSelectedCommit')}
        action={() => history.push('/')}
        actionLabel={translate('toOverview')}
      />
    )
  }

  // TODO move to own component
  const message= selectedCommit.commit.message
  const date= selectedCommit.commit.author.formattedDate
  const author= selectedCommit.author.login
  const avatar= selectedCommit.author.avatar_url

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
          SHA: {selectedCommit.sha}
        </Typography>
      </CardContent>
    </Card>
  )
}
