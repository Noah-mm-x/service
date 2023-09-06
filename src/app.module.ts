// , NestModule, MiddlewareConsumer
import { Module } from "@nestjs/common";
// import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
// APP_INTERCEPTOR
import { APP_GUARD } from "@nestjs/core";
// ConfigService
import { ConfigModule } from "@nestjs/config";
// 控制访问次数
import { ThrottlerModule, ThrottlerGuard } from "@nestjs/throttler";
import { configEnv } from "@config/configEnv";

import { TestModule } from "@module/test/test.module";
const isDev = process.env.RUNNING_ENV === "dev";
@Module({
  imports: [
    TestModule,
    ThrottlerModule.forRoot({
      ttl: 60, // 1分钟
      limit: isDev ? Number.MAX_SAFE_INTEGER : 30 // 请求10次
    }),
    ConfigModule.forRoot({
      // envFilePath: ".env",
      ignoreEnvFile: true,
      isGlobal: true,
      load: [configEnv]
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: TimeoutInterceptor
    // }
  ]
})
export class AppModule {}
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(AuthMiddleware).exclude("user/(.*)").forRoutes("*");
//   }
// }
