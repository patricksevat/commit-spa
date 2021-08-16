import React, { FunctionComponent } from 'react';
import { Alert } from '@material-ui/lab';
import { Button } from '@material-ui/core';
import './Error.scss';

export const Error: FunctionComponent<IErrorProps> = (props) => {
  let action = props.action ? <Button className='error__retry-button' onClick={props.action}>{ props.actionLabel }</Button> : null;

  return (
    <Alert
      variant='filled'
      severity='error'
      action={action}
    >{ props.message }</Alert>
  )
}

interface IErrorProps {
  message: string,
  action?: () => any,
  actionLabel?: string,
}
