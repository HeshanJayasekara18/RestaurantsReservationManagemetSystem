import {
  All, Controller, Req, Res, HttpException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Request, Response } from 'express';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Controller('customers')
export class CustomersProxyController {
  private readonly CUSTOMER_URL =
    process.env.CUSTOMER_SERVICE_URL ?? 'http://localhost:3002';

  constructor(private readonly http: HttpService) {}

  @All('*')
  async proxy(@Req() req: Request, @Res() res: Response) {
    const subPath = req.params[0] ? `/${req.params[0]}` : '';
    const url = `${this.CUSTOMER_URL}/customers${subPath}`;
    try {
      const response = await firstValueFrom(
        this.http.request({
          method: req.method as any,
          url,
          data: req.body,
          headers: {
            ...(req.headers.authorization
              ? { Authorization: req.headers.authorization }
              : {}),
            'Content-Type': 'application/json',
          },
          params: req.query,
        }),
      );
      return res.status(response.status).json(response.data);
    } catch (err) {
      const axiosErr = err as AxiosError;
      const status = axiosErr.response?.status ?? 500;
      const data = axiosErr.response?.data ?? { message: 'Customer service error' };
      throw new HttpException(data as any, status);
    }
  }
}
