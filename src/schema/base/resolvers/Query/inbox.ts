import { GraphQLError } from "graphql";
import MailService, { ReceiveFilters } from "../../../../services/mail.service";
import type { QueryResolvers } from "./../../../types.generated";
import errorMessage from "../../../../constant/error";
export const inbox: NonNullable<QueryResolvers["inbox"]> = async (
  _parent,
  args,
  context,
) => {
  if (!context.currentUser) {
    throw new GraphQLError(errorMessage.UNAUTHORIZED);
  }
  const { take, skip, filters } = args;

  const sentEmailFilter: ReceiveFilters = {
    ...(filters?.read && { read: filters.read }),
    ...(filters?.subject && { subject: filters.subject }),
    ...(filters?.senderEmail && { sender: { email: filters.senderEmail } }),
  };

  return await MailService.receivedEmails(
    context.currentUser.id,
    take,
    skip,
    sentEmailFilter,
  );
};
