import React, { ChangeEvent, FunctionComponent, useContext } from 'react';
import './AppLayout.scss';
import { Typography, AppBar, Toolbar, Select, MenuItem } from '@material-ui/core';
import { TranslationContext } from '../hooks/TranslationContext';
import { useLocation } from 'react-router-dom';

export const AppLayout: FunctionComponent = (props) => {
  const { setLanguage, translate, language } = useContext(TranslationContext);

  function handleLanguageChange(event: ChangeEvent<{ value: unknown }>) {
    const target = event.target as HTMLSelectElement
    setLanguage && setLanguage(target.value);
  }

  const { pathname } = useLocation();
  const pathSegments = pathname.split('/')

  return (
    <>
      <AppBar position={'sticky'}>
        <Toolbar id='toolbar'>
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
