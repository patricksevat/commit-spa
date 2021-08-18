import React, { FunctionComponent, useContext } from 'react';
import { CommitContext } from '../../hooks/CommitContext';
import { Error } from '../../components/Error/Error';
import { TranslationContext } from '../../hooks/TranslationContext';
import { useHistory } from 'react-router-dom';

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

  return (
    <div>
      detail page: {selectedCommit?.sha}
    </div>
  )
}
