import React, { FunctionComponent } from 'react';
import { Skeleton } from '@material-ui/lab';

export const TableSkeleton: FunctionComponent = () => {
  return (
    <>
      <Skeleton variant="text" animation="wave" data-test="skeleton" />
      <Skeleton variant="text" animation="wave" />
      <Skeleton variant="text" animation="wave" />
      <Skeleton variant="rect" height={400} animation="wave" data-test="skeleton" />
    </>
  )
}
