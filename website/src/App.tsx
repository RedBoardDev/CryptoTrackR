import React from 'react';
import {
  BrowserRouter as Router, Routes, Route, Outlet,
} from 'react-router-dom';
import './App.css';
import { ConfigProvider } from 'antd';
// import { DataProvider } from '@contexts/DataContext.tsx';
import NavigationName from '@enums/NavigationEnums';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18n/config.ts';
import AppLayout from '@components/layouts/AppLayout';
import Login from '@views/Login';
import Dashboard from '@views/Dashboard';

function SoftwareLayout() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}

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
        {/* <DataProvider> */}
          <Router>
            <Routes>
              <Route path="/" element={<SoftwareLayout />}>
                <Route index element={<Dashboard />} />
                {/* Ajoutez d'autres routes pour les pages avec layout ici */}
              </Route>
              <Route path="/login" element={<Login />} />
              {/* Ajoutez d'autres routes pour les pages sans layout ici */}
            </Routes>
          </Router>
        {/* </DataProvider> */}
      </ConfigProvider>
    </I18nextProvider>
  );
}

export default App;
