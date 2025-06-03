import { Application, Router } from 'express';

import CategoryRoutes from './category.route';

export async function SetRoutes(app: Application) {
  const router = Router();

  app.use('/api', router);

  new CategoryRoutes(router);

  app.use((req, res) => {
    res.status(404).json({
      success: false,
      message: 'API endpoint not found'
    });
  });

  app.use((err: Error, req: any, res: any, next: any) => {
    console.error(err.stack);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  });
}
