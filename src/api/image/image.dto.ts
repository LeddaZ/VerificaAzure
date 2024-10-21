import { IsString, IsUrl } from 'class-validator'

export class CreateImageDTO {
  @IsUrl()
  url: string

  @IsString()
  description: string

  @IsString()
  language: string
}
