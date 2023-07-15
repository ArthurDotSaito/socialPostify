import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreatePublicationDTO {
  @IsNotEmpty()
  @IsUrl()
  image: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsDate()
  dateToPublish: string;

  @IsBoolean()
  published: boolean;

  @IsNotEmpty()
  @IsString()
  socialMedia: string;
}
