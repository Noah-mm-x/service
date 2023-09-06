import { Injectable } from "@nestjs/common";
@Injectable()
export class TestService {
  // constructor() {}
  async getList() {
    const list = [1, 2, 3];
    return list;
  }
}
