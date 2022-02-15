import { useState, useEffect } from 'react';
import axios from 'axios';

const baseURL = '/login';

export default function useCurrentUser() {
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setUser({ loggedIn: true, jwtToken: localStorage.getItem('token') });
    }
  }, []);

  const [user, setUser] = useState({ loggedIn: false });

  const loginToGetToken = (email, password) => {
    var formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    axios.post(baseURL, formData).then((response) => {
      setUser({ loggedIn: true, jwtToken: response.data.token });
      localStorage.setItem('token', response.data.token);
    });
  };

  const tools = {
    logIn: (email, password) => {
      loginToGetToken(email, password);
    },
    logOut: () => {
      setUser({ loggedIn: false, jwtToken: null });
    },
  };

  return [user, user?.jwtToken != null, tools];
}
