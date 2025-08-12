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
    ...(filters?.read && { read: filters.read }),
    ...(filters?.subject && { subject: filters.subject }),
    ...(filters?.receiverEmail && {
      sender: { email: filters.receiverEmail },
    }),
  };

  return await MailService.sentEmails(
    context.currentUser.id,
    take,
    skip,
    sentEmailFilter,
  );
};
