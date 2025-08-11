import { createSchema } from "graphql-yoga";
import { resolvers } from "./schema/resolvers.generated";
import { typeDefs } from "./schema/typeDefs.generated";
import { GraphQLError } from "graphql";

export const schema = createSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefs],
});
