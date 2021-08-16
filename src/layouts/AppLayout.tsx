import React, { FunctionComponent } from 'react';
import './AppLayout.scss';
import { Typography, AppBar, Toolbar, Select, MenuItem } from '@material-ui/core';

export const AppLayout: FunctionComponent = (props) => {
  return (
    <>
      <AppBar position={'sticky'}>
        <Toolbar id='toolbar'>
          <Typography variant="h6">
            {/* TODO translate
          TODO make this dynamic using context hook
          */}
            Commit overview app
          </Typography>
          <Select id={'appbar__language-selector'} value={'en-us'}>
            <MenuItem value={'en-us'}>
              <span role='img' aria-label='Select English'>🇬🇧</span>
            </MenuItem>
            <MenuItem value={'nl-nl'}>
            <span role='img' aria-label='Select Dutch'>
              🇳🇱
            </span>
            </MenuItem>
          </Select>
        </Toolbar>
      </AppBar>
      { props.children }
    </>

  );
}
