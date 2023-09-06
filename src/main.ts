import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import {
  ValidationPipe,
  HttpStatus,
  BadRequestException
} from "@nestjs/common";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { NestExpressApplication } from "@nestjs/platform-express";
import { GobalMiddleware } from "@src/common/middleware/gobal.middleware";
// import { TimeoutInterceptor } from "@src/common/interceptor/timeout.interceptor";
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import * as path from 'path';
import { StatusCode } from "@statusCode/index";

// import * as csurf from 'csurf';
// export const IS_DEV = process.env.RUNNING_ENV !== 'prod';
// const port = process.env.PORT || 3001
async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(new GobalMiddleware().use);
  // 处理跨域
  app.enableCors();
  // 上传文件目录
  // const uploadFilePath = path.resolve('', `src/module/upload/result`);
  // app.useStaticAssets(uploadFilePath, {
  //   // 配置路径前缀 可以通过http://localhost:3000/uploads/file 来访问
  //   prefix: '/uploads',
  // });
  // // 资源目录
  // const sourceFilePath = path.resolve('', `src/module/source/result`);
  // app.useStaticAssets(sourceFilePath, {
  //   // 配置路径前缀 可以通过http://localhost:3000/uploads/file 来访问
  //   prefix: '/source',
  // });

  // 管道验证
  app.useGlobalPipes(
    new ValidationPipe({
      // 设置校验失败后返回的http状态码
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      // 设置校验失败后的响应数据格式
      exceptionFactory: (errors) => {
        // 此处要注意，errors是一个对象数组，包含了当前所调接口里，所有验证失败的参数及错误信息。
        // 此处的处理是只返回第一个错误信息
        const msg = Object.values(errors[0].constraints)[0];
        return new BadRequestException({
          code: StatusCode["ERROR"],
          data: {},
          msg: msg
        });
      }
    })
  );
  // 拦截器
  // app.useGlobalInterceptors(new TimeoutInterceptor());

  // 允许跨域
  // app.enableCors({
  //   origin: 'http://172.16.223.149:3000',
  //   methods: '*'
  // });

  // csurf攻击
  // app.use(csurf());
  const config = app.get(ConfigService);
  const port = config.get("port");
  // console.log('main port', port);
  // const options = new DocumentBuilder()
  //   .setTitle('接口文档')
  //   .setDescription('这是描述')
  //   .setVersion('1.0')
  //   .addTag('demo')
  //   .build();
  // const document = SwaggerModule.createDocument(app, options);
  // SwaggerModule.setup('docs', app, document);
  await app.listen(port);
}
bootstrap();
