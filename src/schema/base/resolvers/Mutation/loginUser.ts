import AuthService from "../../../../services/auth.service";
import { loginSchema } from "../../../../validations/auth.validation";
import type { MutationResolvers } from "./../../../types.generated";
export const loginUser: NonNullable<MutationResolvers["loginUser"]> = async (
  _parent,
  args,
  _ctx,
) => {
  /* Implement Mutation.loginUser resolver logic here */
  const parsed = loginSchema.safeParse(args);
  if (!parsed.success) {
    const error = parsed.error.issues.map((i) => i.message).join(", ");
    throw new Error(`Validations failed: ${error}`);
  }
  const { user, token } = await AuthService.login(parsed.data);
  return { user, token };
};
