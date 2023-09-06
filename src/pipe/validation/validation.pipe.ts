import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException
} from "@nestjs/common";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (!metadata) return value;
    const object = plainToClass(metadata.metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const msg = Object.values(errors[0].constraints)[0];
      throw new BadRequestException(msg);
    }
    return value;
  }
}
