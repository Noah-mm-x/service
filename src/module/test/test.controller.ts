import { Controller, Get } from "@nestjs/common";
import { TestService } from "./test.service";
@Controller("test")
export class TestController {
  constructor(private readonly testService: TestService) {}
  @Get("test")
  getPerson(): string {
    return "这是个人";
  }
  // @Post("person")
  // getResult(): object {
  //   return this.testService.getResult();
  // }
  @Get("list")
  getList() {
    return this.testService.getList();
  }
  @Get("auth")
  auth() {
    return "auth";
  }
}
