import Home from '../pages/Home.page';
import MintRequests from '../pages/MintRequests.page';

export const ROUTES = [
  {
    name: 'Home',
    path: '/',
    component: <Home />,
    nav: true,
  },
  {
    name: 'MintRequests',
    path: '/mint/requests',
    component: <MintRequests />,
    nav: true,
  },
];

export const NAV_ROUTES = ROUTES.filter((r) => r.nav);
