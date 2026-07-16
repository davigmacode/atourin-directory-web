import { Elysia } from 'elysia';
import { findController } from './find';
import { assignController } from './assign';

const app = new Elysia({ prefix: '/api/categories' })
  .use(findController)
  .use(assignController);

export const GET = app.handle;
export const POST = app.handle;
export type CategoriesApp = typeof app;
