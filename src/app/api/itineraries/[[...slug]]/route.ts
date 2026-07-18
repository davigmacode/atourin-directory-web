import { Elysia } from 'elysia';
import { findController } from './find';
import { getController } from './get';

const app = new Elysia({ prefix: '/api/itineraries' })
  .use(findController)
  .use(getController);

export const GET = app.handle;
export type ItinerariesApp = typeof app;
