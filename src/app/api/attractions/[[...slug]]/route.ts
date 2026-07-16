import { Elysia } from 'elysia';
import { findController } from './find';
import { getController } from './get';

const app = new Elysia({ prefix: '/api/attractions' })
  .use(findController)
  .use(getController);

export const GET = app.handle;
export type AttractionsApp = typeof app;
