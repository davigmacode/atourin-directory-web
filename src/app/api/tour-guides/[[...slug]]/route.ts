import { Elysia } from 'elysia';
import { findController } from './find';
import { getController } from './get';

const app = new Elysia({ prefix: '/api/tour-guides' })
  .use(findController)
  .use(getController);

export const GET = app.handle;
export type TourGuidesApp = typeof app;
