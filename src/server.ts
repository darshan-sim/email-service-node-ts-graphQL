import { createServer } from 'node:http';
import { createSchema, createYoga } from 'graphql-yoga';
import {
	createInlineSigningKeyProvider,
	extractFromHeader,
	useJWT
} from '@graphql-yoga/plugin-jwt';
import { useCSRFPrevention } from '@graphql-yoga/plugin-csrf-prevention';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.JWT_SECRET) {
	console.error(
		'JWT_SECRET environment variable is not defined. Server cannot start.'
	);
	process.exit(1);
}

const yoga = createYoga({
	schema: createSchema({
		typeDefs: /* GraphQL */ `
			type Query {
				hello: String
			}
		`,
		resolvers: {
			Query: {
				hello: () => 'Hello from Yoga!'
			}
		}
	}),
	plugins: [
		useJWT({
			signingKeyProviders: [
				createInlineSigningKeyProvider(process.env.JWT_SECRET)
			],
			tokenLookupLocations: [
				extractFromHeader({ name: 'authorization', prefix: 'Bearer' })
			],
			tokenVerification: {
				algorithms: ['HS256', 'RS256']
			},
			reject: {
				missingToken: true,
				invalidToken: true
			}
		}),
		useCSRFPrevention({
			requestHeaders: ['x-graphql-yoga-csrf']
		})
	]
});

const server = createServer(yoga);

server.listen(4000, () => {
	console.info('Server is running on http://localhost:4000/graphql');
});
