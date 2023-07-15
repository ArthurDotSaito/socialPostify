import {
  IsBoolean,
  IsDateString,
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
  @IsDateString()
  dateToPublish: string;

  @IsBoolean()
  published = false;

  @IsNotEmpty()
  @IsString()
  socialMedia: string;
}
