import React from 'react';
import './App.css';
import { SignIn } from './components/authentication/singin';
import { SignUp } from './components/authentication/signup';
import { useTranslation } from "react-i18next";
import { Route, Routes } from 'react-router-dom';
import { Discovery } from './components/discovery/discovery';
import { UserDetails } from './components/authentication/userDetails';
import { AuthProvider } from './context/authContext';
import ProtectedRoutes from './components/authentication/protectedRoutes';
import { Header } from './components/header/header';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import customTheme from './theme/light.json'
import { HTTPProvider } from './services/http/requests';

const theme = createTheme(customTheme)

function App() {
  const {t} = useTranslation();
  
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <HTTPProvider>
            <Header t={t}/>
            <Routes>
              <Route path='/' element={<SignIn t={t} />}/>
              <Route path='/signup' element={<SignUp t={t} />}/>
              <Route path='/discovery' element={
                <ProtectedRoutes>
                  <Discovery t={t} />
                </ProtectedRoutes>
              }/>
              <Route path='/username' element={
                <ProtectedRoutes>
                  <UserDetails t={t} />
                </ProtectedRoutes>
              }/>
            </Routes>
          </HTTPProvider>
        </AuthProvider>
    </ThemeProvider>
    </div>
  );
}

export default App;
