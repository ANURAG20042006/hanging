import { IsString, IsOptional, MaxLength, IsEnum } from 'class-validator';

export enum ChannelType {
  TEXT = 'TEXT',
  VOICE = 'VOICE',
}

export class CreateChannelDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsEnum(ChannelType)
  type?: ChannelType = ChannelType.TEXT;
}
