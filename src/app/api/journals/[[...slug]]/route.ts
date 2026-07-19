import { Elysia } from 'elysia';
import { findController } from './find';
import { getController } from './get';

const app = new Elysia({ prefix: '/api/journals' })
  .use(findController)
  .use(getController);

export const GET = app.handle;
export type JournalsApp = typeof app;
