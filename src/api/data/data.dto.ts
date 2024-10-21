import { IsArray } from 'class-validator'

export class CreateDataDTO {
  @IsArray()
  urlList: Array<string>

  @IsArray()
  langList: Array<string>
}
