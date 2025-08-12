import { GraphQLError } from "graphql";
import type { QueryResolvers } from "./../../../types.generated";
import errorMessage from "../../../../constant/error";
import MailService, { SentFilters } from "../../../../services/mail.service";
export const sentEmail: NonNullable<QueryResolvers["sentEmail"]> = async (
  _parent,
  args,
  context,
) => {
  if (!context.currentUser) {
    throw new GraphQLError(errorMessage.UNAUTHORIZED);
  }
  const { skip, take, filters } = args;

  const sentEmailFilter: SentFilters = {
    ...(typeof filters?.read === "boolean" && { read: filters.read }),
    ...(filters?.subject && { subject: filters.subject }),
    ...(filters?.email && {
      receiver: { email: filters.email },
    }),
  };

  return await MailService.sentEmails(
    context.currentUser.id,
    take,
    skip,
    sentEmailFilter,
  );
};
