import AuthService from "../../../../services/auth.service";
import { registerSchema } from "../../../../validations/auth.validation";
import type { MutationResolvers } from "./../../../types.generated";
export const registerUser: NonNullable<
  MutationResolvers["registerUser"]
> = async (_parent, args, _ctx) => {
  const parsed = registerSchema.safeParse(args.input);
  if (!parsed.success) {
    const error = parsed.error.issues.map((i) => i.message).join(", ");
    throw new Error(`Validations failed: ${error}`);
  }
  const { user, token } = await AuthService.register(parsed.data);
  return { user, token };
};
