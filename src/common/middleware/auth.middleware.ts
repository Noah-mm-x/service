// UnauthorizedException
import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
// import axios from "axios";
// import { configEnv } from "@config/configEnv";
// const { authUrl } = configEnv();

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    // 临时关闭鉴权
    // const regex = /Bearer\s(.+)/;
    // const str = req.headers?.authorization;
    // if (!str) {
    //   return next(new UnauthorizedException());
    // }
    // const match = str.match(regex);
    // const token = match[1];
    // const url = `${authUrl}/oauth/check_token?token=${token}`;
    // const response = await axios.post(url, {
    //   timeout: 10000
    // });
    // const data = response?.data;
    // if (data?.active) {
    //   console.log("鉴权成功");
    //   next();
    // } else {
    //   next(new UnauthorizedException());
    // }
    next();
  }
}
