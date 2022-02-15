import React from 'react';
import { useAuth } from '../providers/AuthProvider';
import { NAV_ROUTES } from '../config/routes.config';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

export default function Navbar() {
  const history = useNavigate();
  const { logOut } = useAuth();

  const NavItem = ({ route }) => (
    <Menu.Item onClick={() => history(route.path)}>{route.name}</Menu.Item>
  );

  return (
    <Menu fixed="top" inverted size="huge">
      <Menu.Item as="a" header onClick={() => history('/')}>
        Mazu Admin
      </Menu.Item>
      {NAV_ROUTES.map((item) => (
        <NavItem route={item} key={item.path} />
      ))}
      <Menu.Item as="a" position="right" onClick={() => logOut()}>
        Logout
      </Menu.Item>
    </Menu>
  );
}
