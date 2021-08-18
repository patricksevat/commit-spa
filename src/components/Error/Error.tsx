import React, { FunctionComponent, useContext } from 'react';
import { Alert } from '@material-ui/lab';
import { Button } from '@material-ui/core';
import './Error.scss';
import { TranslationContext } from '../../hooks/TranslationContext';

export const Error: FunctionComponent<IErrorProps> = (props) => {
  const { translate } = useContext(TranslationContext);
  let action = props.action ? <Button className='error__retry-button' onClick={props.action}>{ props.actionLabel }</Button> : null;

  return (
    <Alert
      variant='filled'
      severity='error'
      action={action}
    >{ translate(props.message) }</Alert>
  )
}

interface IErrorProps {
  message: string,
  action?: () => any,
  actionLabel?: string,
}
