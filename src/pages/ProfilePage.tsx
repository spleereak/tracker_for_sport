import React, { useEffect, useState } from 'react';
import { UserData } from '../types/types';
import { InitialForm } from '@/components/InitialForm';
import { Dashboard } from '@/components/Dashboard';

const ProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
      setUserData(JSON.parse(savedData));
    }
  }, []);

  const handleUserDataUpdate = (data: UserData) => {
    setUserData(data);
    localStorage.setItem('userData', JSON.stringify(data));
  };

  const handleSubmitUserData = (data: UserData) => {
    setUserData(data);
    localStorage.setItem('userData', JSON.stringify(data));
    window.location.reload()
  }

  return (
    <>
      {
        userData ? (
          <Dashboard userData={userData} onUpdateUser={handleUserDataUpdate} /> 
        ): (
          <InitialForm onSubmit={handleSubmitUserData} />
        )
      }
    </>
  )
      
};

export default ProfilePage;