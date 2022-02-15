import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from '../pages/NotFound.page';
import Navbar from './Navbar';

export default function RouteComp({ routes }) {
  const renderRoutes = routes.map((route) => {
    const { path, component } = route;
    return <Route path={path} element={component} key={path} exact />;
  });

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {renderRoutes}
        <Route element={NotFound} />
      </Routes>
    </BrowserRouter>
  );
}
