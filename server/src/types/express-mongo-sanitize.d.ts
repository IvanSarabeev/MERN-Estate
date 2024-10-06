// @types/express-mongo-sanitize.d.ts

declare module 'express-mongo-sanitize' {
    import { RequestHandler } from 'express';
  
    export function mongoSanitize(options?: unknown): RequestHandler;
  
    export default mongoSanitize;
  }