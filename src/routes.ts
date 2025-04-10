import React from 'react';

export const HomePage = React.lazy(() => import('@/pages/home/Home'));
export const CharacterPage = React.lazy(() => import('@/pages/character/Character'));
export const NotFoundPage = React.lazy(() => import('@/pages/notFound/NotFound'));
