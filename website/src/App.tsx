import React from 'react';
import {
  BrowserRouter as Router, Routes, Route, Outlet,
} from 'react-router-dom';
import './App.css';
import { ConfigProvider } from 'antd';
import { DataProvider } from '@contexts/DataContext.tsx';
import NavigationName from '@enums/NavigationEnums';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18n/config.ts';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: 'ABeeZee, sans-serif',
          },
        }}
      >
          <Router>
            <Routes>
              {/* AUTHENTIFICATION  */}
              {/* <Route path={RouteName.LOGIN} element={<Login />} /> */}
            </Routes>
          </Router>
      </ConfigProvider>
    </I18nextProvider>
  );
}

export default App;
