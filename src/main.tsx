import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter, createRootRoute } from '@tanstack/react-router';
import { Layout } from './components/Layout';
import './styles.css';

const rootRoute = createRootRoute({
  component: Layout,
});

const routeTree = rootRoute.addChildren([]);

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: () => null,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
