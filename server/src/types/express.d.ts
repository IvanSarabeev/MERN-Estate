/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import type * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string; // or whatever type your user ID is
        // Include other user properties if needed
      };
    }
  }
}