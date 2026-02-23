import {
  All, Controller, Req, Res, HttpException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Request, Response } from 'express';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Controller('auth')
export class AuthProxyController {
  private readonly AUTH_URL =
    process.env.AUTH_SERVICE_URL ?? 'http://localhost:3001';

  constructor(private readonly http: HttpService) {}

  @All('*')
  async proxy(@Req() req: Request, @Res() res: Response) {
    const url = `${this.AUTH_URL}/auth/${req.params[0]}`;
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
      const data = axiosErr.response?.data ?? { message: 'Auth service error' };
      throw new HttpException(data as any, status);
    }
  }
}
