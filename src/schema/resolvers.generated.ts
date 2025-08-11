/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
import type { Resolvers } from "./types.generated";
import { me as Query_me } from "./base/resolvers/Query/me";
import { loginUser as Mutation_loginUser } from "./base/resolvers/Mutation/loginUser";
import { registerUser as Mutation_registerUser } from "./base/resolvers/Mutation/registerUser";
import { Email } from "./base/resolvers/Email";
export const resolvers: Resolvers = {
  Query: { me: Query_me },
  Mutation: {
    loginUser: Mutation_loginUser,
    registerUser: Mutation_registerUser,
  },
  Email: Email,
};
