import { Prop, SchemaFactory } from '@nestjs/mongoose';

export class Auth {
  @Prop({
    type: String,
    required: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
