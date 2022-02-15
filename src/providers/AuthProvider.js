import React, { createContext, useContext, useState } from 'react';
import {
  Form,
  Button,
  Container,
  Header,
  Segment,
  Divider,
} from 'semantic-ui-react';
import useCurrentUser from '../hooks/use-current-user.hook';

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, loggedIn, tools] = useCurrentUser();
  const [email, setEmail] = useState('bikash.dulal@wesionary.team');
  const [password, setPassword] = useState('testing');

  const handleSubmit = (event) => {
    event.preventDefault();
    tools.logIn(email, password);
  };

  if (!user || !loggedIn) {
    return (
      <Container>
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        <Segment placeholder>
          <Form onSubmit={handleSubmit}>
            <Header textAlign="center">Login</Header>
            <Form.Field>
              <label>Username</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Field>
            <Button type="submit">Login</Button>
          </Form>
        </Segment>
      </Container>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loggedIn, ...tools }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
