import React, { FunctionComponent } from 'react';
import { CommitContext } from '../../hooks/CommitContext';
import { Error } from '../../components/Error/Error';
import { TranslationContext } from '../../hooks/TranslationContext';
import { useHistory } from 'react-router-dom';
import './DetailPage.scss'
import { CommitDetailCard } from '../../components/CommitDetailCard/CommitDetailCard';

export const DetailPage: FunctionComponent = () => {
  const history = useHistory();
  const { selectedCommit } = React.useContext(CommitContext);
  const { translate } = React.useContext(TranslationContext);

  if(!selectedCommit) {
    return (
      <Error
        message={translate('noSelectedCommit')}
        action={() => history.push('/')}
        actionLabel={translate('toOverview')}
      />
    )
  }

  return (
    <CommitDetailCard/>
  )
}
