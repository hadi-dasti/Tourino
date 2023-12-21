import { Router } from 'express';
import { DashboardLoginController } from './dashboard.login.controller';

const dashboardLoginController = new DashboardLoginController();

const router: Router = Router();

router.get(
  '/show-dashboard-login',
  dashboardLoginController.dashboardLoginAdmin.bind(dashboardLoginController),
);

export default router;
