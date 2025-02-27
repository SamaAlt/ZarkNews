// react-vite/src/router/Layout.jsx
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ModalProvider, Modal } from '../context/Modal';
import { thunkAuthenticate } from '../redux/session';
import Navigation from '../components/Navigation/Navigation';

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <ModalProvider>
        <Navigation user={user} />
        {isLoaded && <Outlet />}
        <Modal />
      </ModalProvider>
    </>
  );
}