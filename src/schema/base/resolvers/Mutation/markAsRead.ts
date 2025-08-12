import { GraphQLError } from "graphql";
import type { MutationResolvers } from "./../../../types.generated";
import errorMessage from "../../../../constant/error";
import { markAsReadSchema } from "../../../../validations/mail.validation";
import MailService from "../../../../services/mail.service";
export const markAsRead: NonNullable<MutationResolvers["markAsRead"]> = async (
  _parent,
  args,
  { currentUser },
) => {
  if (!currentUser) {
    throw new GraphQLError(errorMessage.UNAUTHORIZED);
  }
  const parsed = markAsReadSchema.safeParse(args.input);
  if (parsed.error) {
    const error = parsed.error.issues.map((i) => i.message).join(", ");
    throw new GraphQLError(error);
  }
  const count = await MailService.markAsRead(currentUser.id, parsed.data.ids);
  return { count };
};
