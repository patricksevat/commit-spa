import React, { ChangeEvent, FunctionComponent } from 'react';
import './AppLayout.scss';
import { Typography, AppBar, Toolbar, Select, MenuItem, IconButton } from '@material-ui/core';
import { TranslationContext } from '../hooks/TranslationContext';
import { useLocation, useHistory } from 'react-router-dom';
import { ArrowBack } from '@material-ui/icons';

export const AppLayout: FunctionComponent = (props) => {
  const { setLanguage, translate, language } = React.useContext(TranslationContext);

  function handleLanguageChange(event: ChangeEvent<{ value: unknown }>) {
    const target = event.target as HTMLSelectElement
    setLanguage && setLanguage(target.value);
  }

  const history = useHistory();
  const { pathname } = useLocation();
  const pathSegments = pathname.split('/')

  return (
    <>
      <AppBar position={'sticky'}>
        <Toolbar id='toolbar'>
          { pathSegments[1] &&
            <IconButton edge="start" color='inherit' onClick={() => history.push('/')}>
              <ArrowBack />
            </IconButton>
          }
          <Typography variant="h6">
            { translate(`toolbarTitle/${pathSegments[1]}`)}
          </Typography>
          <Select id={'appbar__language-selector'} value={language} onChange={handleLanguageChange}>
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
      <main>
        { props.children }
      </main>
    </>

  );
}
