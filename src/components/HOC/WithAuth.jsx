import React, { useEffect } from 'react';
import { auth } from '../../config/firebase';
import { useStore } from '../../global/store';

const withAuth = (WrappedComponent) => {
  return function WithAuth(props) {
    const { setLoggedIn } = useStore();

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setLoggedIn(!!user);
      });

      return () => {
        unsubscribe(); // Unsubscribe from the auth state changes on component unmount
      };
    }, [setLoggedIn]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
