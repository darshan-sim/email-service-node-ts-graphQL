import { createServer } from "node:http";
import {
  createInlineSigningKeyProvider,
  extractFromHeader,
  useJWT,
} from "@graphql-yoga/plugin-jwt";
import { useCSRFPrevention } from "@graphql-yoga/plugin-csrf-prevention";
import dotenv from "dotenv";
import { schema } from "./schema";
import { createContext } from "./context";
import { USER_SELECT } from "./services/auth.service";
import { createYoga, useExtendContext } from "graphql-yoga";
dotenv.config();

if (!process.env.JWT_SECRET) {
  console.error(
    "JWT_SECRET environment variable is not defined. Server cannot start.",
  );
  process.exit(1);
}

const yoga = createYoga({
  schema,
  context: createContext,
  plugins: [
    useJWT({
      signingKeyProviders: [
        createInlineSigningKeyProvider(process.env.JWT_SECRET),
      ],
      tokenLookupLocations: [
        extractFromHeader({ name: "authorization", prefix: "Bearer" }),
      ],
      tokenVerification: {
        algorithms: ["HS256"],
      },
      extendContext: true,
      reject: {
        missingToken: false,
        invalidToken: true,
      },
    }),
    useExtendContext(async (ctx) => {
      if (!ctx.jwt) {
        return {};
      }
      const { id } = ctx.jwt?.payload;
      if (!id) {
        return {};
      }
      const currentUser = await ctx.prisma.user.findUnique({
        where: { id },
        select: USER_SELECT,
      });
      if (!currentUser) return {};
      return { currentUser };
    }),
    useCSRFPrevention({
      requestHeaders: ["x-graphql-yoga-csrf"],
    }),
  ],
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.info("Server is running on http://localhost:4000/graphql");
});
