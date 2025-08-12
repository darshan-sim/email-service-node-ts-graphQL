import { GraphQLError } from "graphql";
import { sendEmailSchema } from "../../../../validations/mail.validation";
import type { MutationResolvers } from "./../../../types.generated";
import MailService from "../../../../services/mail.service";
import errorMessage from "../../../../constant/error";
export const sendEmail: NonNullable<MutationResolvers["sendEmail"]> = async (
  _parent,
  args,
  context,
) => {
  if (!context.currentUser) {
    throw new GraphQLError(errorMessage.UNAUTHORIZED);
  }
  const parsed = sendEmailSchema.safeParse(args.input);
  if (parsed.error) {
    const error = parsed.error.issues.map((i) => i.message).join(", ");
    throw new GraphQLError(error);
  }
  return MailService.sendEmail(context.currentUser.id, parsed.data);
};
