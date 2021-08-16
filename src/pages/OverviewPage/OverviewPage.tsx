import React, { FunctionComponent } from 'react';

export const OverviewPage: FunctionComponent = (props) => {
  return (
    <>
      <p>Overview</p>
      { props.children }
    </>
  )
};
