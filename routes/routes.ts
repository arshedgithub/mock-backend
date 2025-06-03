import { Application, Router } from 'express';

import CategoryRoutes from './category.route';
import UserRoutes from './user.route';
import PageRoutes from './page.route';

export async function SetRoutes(app: Application) {
  const router = Router();

  app.use('/api', router);

  new CategoryRoutes(router);
  new UserRoutes(router);
  new PageRoutes(app);

  // Handle 404 errors
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      message: 'Endpoint not found'
    });
  });

  // Global error handler
  app.use((err: Error, req: any, res: any, next: any) => {
    console.error(err.stack);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  });
}
