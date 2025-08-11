import type { EmailResolvers } from "./../../types.generated";
export const Email: EmailResolvers = {
  createdAt: ({ createdAt }, _arg, _ctx) => {
    return createdAt ? createdAt.toISOString() : null;
  },
};
