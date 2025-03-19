import React from 'react';
import { Header } from '../components/Header';
import { Outlet } from 'react-router-dom';

export const MainLayout: React.FC = () => {
    const [userData, setUserData] = React.useState();

    React.useEffect(() => {
        const savedData = localStorage.getItem('userData');
        if (savedData) {
            setUserData(JSON.parse(savedData));
        }
    }, []);
  return (
    <>
      {(userData) && (
        <Header />
      )}
      <Outlet />
    </>
  )
}