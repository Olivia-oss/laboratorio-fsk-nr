import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from '../schemas/auth.schema';
import { AuthDto } from '../dtos/create_auth.dto';
import * as CryptoJS from 'crypto-js';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private readonly authModel: Model<Auth>,
    private readonly jwtService: JwtService,
  ) {}

  async createAuth(authDto: AuthDto) {
    try {
      const dataFormat = {
        email: authDto.email,
        password: await this.encryptPassword(authDto.password),
      };

      const authCreate = new this.authModel(dataFormat);
      const authCreated = await authCreate.save();

      return {
        token: await this.genereteTokenJWT(authCreated._id.toString()),
      };
    } catch (error) {
      throw error;
    }
  }

  async postLogin(authDto: AuthDto) {
    try {
      const auth = await this.authModel.findOne({ email: authDto.email });

      if (!auth) {
        throw new UnauthorizedException();
      }

      const hashPasseord = await this.encryptPassword(authDto.password);

      const isPasswordCorrect = hashPasseord === auth.password;

      if (isPasswordCorrect) {
        return {
          token: await this.genereteTokenJWT(auth._id.toString()),
        };
      }
      throw new UnauthorizedException();
    } catch (error) {
      throw error;
    }
  }

  async encryptPassword(password: string) {
    return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
  }

  async genereteTokenJWT(id: string) {
    const paylod = { id };
    return this.jwtService.sign(paylod);
  }

  buildLoginCookieBase() {
    return {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000,
      path: '/',
    };
  }
}
