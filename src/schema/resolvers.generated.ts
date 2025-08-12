/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
import type { Resolvers } from "./types.generated";
import { inbox as Query_inbox } from "./base/resolvers/Query/inbox";
import { me as Query_me } from "./base/resolvers/Query/me";
import { sentEmail as Query_sentEmail } from "./base/resolvers/Query/sentEmail";
import { loginUser as Mutation_loginUser } from "./base/resolvers/Mutation/loginUser";
import { markAsRead as Mutation_markAsRead } from "./base/resolvers/Mutation/markAsRead";
import { registerUser as Mutation_registerUser } from "./base/resolvers/Mutation/registerUser";
import { sendEmail as Mutation_sendEmail } from "./base/resolvers/Mutation/sendEmail";
import { Email } from "./base/resolvers/Email";
import { User } from "./base/resolvers/User";
export const resolvers: Resolvers = {
  Query: { inbox: Query_inbox, me: Query_me, sentEmail: Query_sentEmail },
  Mutation: {
    loginUser: Mutation_loginUser,
    markAsRead: Mutation_markAsRead,
    registerUser: Mutation_registerUser,
    sendEmail: Mutation_sendEmail,
  },

  Email: Email,
  User: User,
};
