import { Context } from 'elysia';

declare module 'elysia' {
  interface Context {
    log?: {
      error: (data: any, message?: string) => void;
      info: (data: any, message?: string) => void;
      warn: (data: any, message?: string) => void;
      debug: (data: any, message?: string) => void;
      // Add other log methods if needed
    };
  }
}