import React, { ChangeEvent, FunctionComponent } from 'react';
import { TextField } from '@material-ui/core';
import { convertDateTimeLocalToIso8601, convertIso8601ToDateTimeLocal } from '../../utils/date-time';
import { CommitContext } from '../../hooks/CommitContext';
import { TranslationContext } from '../../hooks/TranslationContext';
import './CommitOverviewTableFilters.scss'

export const CommitOverviewTableFilters: FunctionComponent = () => {
  const { translate } = React.useContext(TranslationContext);
  const { since, setSince, until, setUntil } = React.useContext(CommitContext);

  function handleSinceChange(event: ChangeEvent<{ value: unknown }>) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    setSince && setSince(convertDateTimeLocalToIso8601(value))
  }

  function handleUntilChange(event: ChangeEvent<{ value: unknown }>) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    setUntil && setUntil(convertDateTimeLocalToIso8601(value))
  }

  // TODO add a debounce to onChange https://stackoverflow.com/a/58594348/6673257
  return (
    <form noValidate id={'commit-overview-table-filters'}>
      <TextField
        id="datetime-since"
        className='commit-overview-table-filters__datetime-input'
        label={translate('since')}
        type="datetime-local"
        value={convertIso8601ToDateTimeLocal(since)}
        onChange={handleSinceChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="datetime-until"
        className='commit-overview-table-filters__datetime-input'
        label={translate('until')}
        type="datetime-local"
        value={convertIso8601ToDateTimeLocal(until)}
        onChange={handleUntilChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  )
}
