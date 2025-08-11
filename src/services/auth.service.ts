import { prisma } from "../context";
import bcrypt from "bcrypt";
import jwt, { JwtPayload, verify } from "jsonwebtoken";
import { LoginUser, RegisterUser } from "../validations/auth.validation";
import errorMessage from "../constant/error";
import { User } from "@prisma/client";

const saltRound = 10;

export const USER_SELECT = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  sentEmails: {
    include: {
      sender: true,
      receiver: true,
    },
  },
  receivedEmails: {
    include: {
      sender: true,
      receiver: true,
    },
  },
};

async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(saltRound);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

function signJWT(id: string, email: string) {
  return jwt.sign(
    {
      id,
      email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    process.env.JWT_SECRET!,
    {
      algorithm: "HS256",
    },
  );
}

export default class AuthService {
  static register = async (input: RegisterUser) => {
    const { email, password, firstName, lastName } = input;
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      throw new Error(errorMessage.EMAIL_REGISTERED);
    }
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
      },
      select: USER_SELECT,
    });
    const token = signJWT(user.id, user.email);
    return { token, user };
  };

  static login = async (input: LoginUser) => {
    const { email, password } = input;
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
      select: { ...USER_SELECT, password: true },
    });
    if (!existingUser) {
      throw new Error(errorMessage.INVALID_CREDENTIALS);
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      throw new Error(errorMessage.INVALID_CREDENTIALS);
    }
    const { password: _pw, ...user } = existingUser;
    const token = signJWT(user.id, user.email);
    return { token, user };
  };

}
