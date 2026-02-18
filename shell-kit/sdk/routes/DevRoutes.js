
import React from 'react';

export const LOCAL_DEV_DOMAIN_ID = '__LOCAL_DEV__';

// Use native glob to find pages in shell-kit src
// Path is relative to this file: ../../src/pages/local-routes
const LOCAL_DEV_PAGE_MODULES = import.meta.glob('../../src/pages/local-routes/**/*Page.tsx', {
  eager: true,
});

const toKebabCase = (value) => {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[_]+/g, '-')
    .toLowerCase();
};

const toLabel = (routePath) => {
  return routePath;
};

const toRoutePath = (modulePath) => {
  // Module path is like: ../../src/pages/local-routes/foo/BarPage.tsx
  const routeSource = modulePath
    .replace('../../src/pages/local-routes/', '')
    .replace(/\.tsx$/, '');

  const rawSegments = routeSource.split('/');
  const directorySegments = rawSegments.slice(0, -1);
  const fileSegment = rawSegments.at(-1)?.replace(/Page$/, '') ?? '';

  const routeSegments = directorySegments.length > 0 ? directorySegments : [fileSegment];
  return `/${routeSegments.filter(Boolean).map(toKebabCase).join('/')}`;
};

export const DEV_LOCAL_APP_ROUTES = !import.meta.env.DEV
  ? []
  : Object.entries(LOCAL_DEV_PAGE_MODULES).map(([modulePath, pageModule]) => ({
      path: toRoutePath(modulePath),
      element: React.createElement(pageModule.default),
      requiresAuth: false,
    }));

export const DEV_LOCAL_SERVER_PAGES = !import.meta.env.DEV
  ? []
  : Object.entries(LOCAL_DEV_PAGE_MODULES).map(([modulePath]) => {
      const path = toRoutePath(modulePath);
      return {
        id: `LOCAL_DEV:${path}`,
        name: toLabel(path),
        path,
        requiredRoles: [],
      };
    });
