import { Prisma, PrismaClient, User } from "@prisma/client";
import AuthService, { USER_SELECT } from "./services/auth.service";
import { YogaInitialContext } from "graphql-yoga";

export const prisma = new PrismaClient();

type UserWithEmails = Prisma.UserGetPayload<{
  select: typeof USER_SELECT;
}>;

export type GraphQLContext = {
  prisma: PrismaClient;
  currentUser: null | UserWithEmails;
};

export async function createContext(
  initialContext: YogaInitialContext,
): Promise<GraphQLContext> {
  return {
    prisma,
    currentUser: null,
  };
}
