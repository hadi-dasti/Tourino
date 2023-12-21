import { Request, Response } from 'express';
import { DashboardLoginRepository } from './dashboard.login.repository';
import { DashboardLoginDto } from './dashboard.login.dto';

export class DashboardLoginController {
  private readonly dashboardLoginRepository = DashboardLoginRepository;

  public async dashboardLoginAdmin(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const dashboardLoginDto: DashboardLoginDto = req.body;
    try {
      const showDashboard = await this.dashboardLoginRepository.DashboardLogin(
        dashboardLoginDto,
      );

      if (!showDashboard) {
        return res.status(404).json({
          success: false,
          msg: 'Error Not found',
        });
      }

      return res.status(200).json({
        success: true,
        data: { showDashboard },
        msg: 'Successfully build login to Dashboard',
      });
        
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        msg: 'Internal Server Error',
      });
    }
  }
}
