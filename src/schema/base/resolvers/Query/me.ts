import { GraphQLError } from "graphql";
import errorMessage from "../../../../constant/error";
import type { QueryResolvers } from "./../../../types.generated";
export const me: NonNullable<QueryResolvers["me"]> = async (
  _parent,
  _arg,
  context,
) => {
  if (!context.currentUser) {
    throw new GraphQLError(errorMessage.UNAUTHORIZED);
  }
  return context.currentUser;
};
