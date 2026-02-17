import { app, initializeApp } from "../server/index";
import type { VercelRequest, VercelResponse } from "@vercel/node";

let isInitialized = false;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!isInitialized) {
    await initializeApp();
    isInitialized = true;
  }
  
  // Forward the request to the Express app
  return new Promise((resolve, reject) => {
    app(req as any, res as any, (err?: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(undefined);
      }
    });
  });
}
