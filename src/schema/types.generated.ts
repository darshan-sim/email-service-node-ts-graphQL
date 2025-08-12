import { GraphQLResolveInfo } from "graphql";
import { EmailMapper } from "./base/schema.mappers";
import { GraphQLContext } from "../context";
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string | number };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type AuthPayload = {
  __typename?: "AuthPayload";
  token: Scalars["String"]["output"];
  user: User;
};

export type Email = {
  __typename?: "Email";
  body?: Maybe<Scalars["String"]["output"]>;
  createdAt?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  read?: Maybe<Scalars["Boolean"]["output"]>;
  receiver: User;
  sender: User;
  subject?: Maybe<Scalars["String"]["output"]>;
};

/**
 * If an email filter is applied on the `inbox` query,
 * filter emails based on the sender.
 *
 * If an email filter is applied on the `sentEmail` query,
 * filter emails based on the receiver.
 */
export type EmailFilters = {
  email?: InputMaybe<Scalars["String"]["input"]>;
  read?: InputMaybe<Scalars["Boolean"]["input"]>;
  subject?: InputMaybe<Scalars["String"]["input"]>;
};

export type MarkAsReadInput = {
  ids: Array<Scalars["ID"]["input"]>;
};

export type MarkAsReadPayload = {
  __typename?: "MarkAsReadPayload";
  count: Scalars["Int"]["output"];
};

export type Mutation = {
  __typename?: "Mutation";
  loginUser: AuthPayload;
  markAsRead: MarkAsReadPayload;
  registerUser: AuthPayload;
  sendEmail: Email;
};

export type MutationloginUserArgs = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type MutationmarkAsReadArgs = {
  input: MarkAsReadInput;
};

export type MutationregisterUserArgs = {
  input: RegisterUserInput;
};

export type MutationsendEmailArgs = {
  input?: InputMaybe<SendEmail>;
};

export type Query = {
  __typename?: "Query";
  inbox: Array<Email>;
  me: User;
  sentEmail: Array<Maybe<Email>>;
};

export type QueryinboxArgs = {
  filters?: InputMaybe<EmailFilters>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QuerysentEmailArgs = {
  filters?: InputMaybe<EmailFilters>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
};

export type RegisterUserInput = {
  email: Scalars["String"]["input"];
  firstName?: InputMaybe<Scalars["String"]["input"]>;
  lastName?: InputMaybe<Scalars["String"]["input"]>;
  password: Scalars["String"]["input"];
};

export type SendEmail = {
  body: Scalars["String"]["input"];
  subject?: InputMaybe<Scalars["String"]["input"]>;
  to: Scalars["String"]["input"];
};

export type User = {
  __typename?: "User";
  email: Scalars["String"]["output"];
  firstName?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  lastName?: Maybe<Scalars["String"]["output"]>;
  receivedEmails: Array<Email>;
  sentEmails: Array<Email>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthPayload: ResolverTypeWrapper<
    Omit<AuthPayload, "user"> & { user: ResolversTypes["User"] }
  >;
  String: ResolverTypeWrapper<Scalars["String"]["output"]>;
  Email: ResolverTypeWrapper<EmailMapper>;
  ID: ResolverTypeWrapper<Scalars["ID"]["output"]>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>;
  EmailFilters: EmailFilters;
  MarkAsReadInput: MarkAsReadInput;
  MarkAsReadPayload: ResolverTypeWrapper<MarkAsReadPayload>;
  Int: ResolverTypeWrapper<Scalars["Int"]["output"]>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  RegisterUserInput: RegisterUserInput;
  SendEmail: SendEmail;
  User: ResolverTypeWrapper<
    Omit<User, "receivedEmails" | "sentEmails"> & {
      receivedEmails: Array<ResolversTypes["Email"]>;
      sentEmails: Array<ResolversTypes["Email"]>;
    }
  >;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthPayload: Omit<AuthPayload, "user"> & {
    user: ResolversParentTypes["User"];
  };
  String: Scalars["String"]["output"];
  Email: EmailMapper;
  ID: Scalars["ID"]["output"];
  Boolean: Scalars["Boolean"]["output"];
  EmailFilters: EmailFilters;
  MarkAsReadInput: MarkAsReadInput;
  MarkAsReadPayload: MarkAsReadPayload;
  Int: Scalars["Int"]["output"];
  Mutation: {};
  Query: {};
  RegisterUserInput: RegisterUserInput;
  SendEmail: SendEmail;
  User: Omit<User, "receivedEmails" | "sentEmails"> & {
    receivedEmails: Array<ResolversParentTypes["Email"]>;
    sentEmails: Array<ResolversParentTypes["Email"]>;
  };
};

export type AuthPayloadResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes["AuthPayload"] = ResolversParentTypes["AuthPayload"],
> = {
  token?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EmailResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes["Email"] = ResolversParentTypes["Email"],
> = {
  body?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  createdAt?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  read?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  receiver?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  sender?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  subject?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MarkAsReadPayloadResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes["MarkAsReadPayload"] = ResolversParentTypes["MarkAsReadPayload"],
> = {
  count?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"],
> = {
  loginUser?: Resolver<
    ResolversTypes["AuthPayload"],
    ParentType,
    ContextType,
    RequireFields<MutationloginUserArgs, "email" | "password">
  >;
  markAsRead?: Resolver<
    ResolversTypes["MarkAsReadPayload"],
    ParentType,
    ContextType,
    RequireFields<MutationmarkAsReadArgs, "input">
  >;
  registerUser?: Resolver<
    ResolversTypes["AuthPayload"],
    ParentType,
    ContextType,
    RequireFields<MutationregisterUserArgs, "input">
  >;
  sendEmail?: Resolver<
    ResolversTypes["Email"],
    ParentType,
    ContextType,
    Partial<MutationsendEmailArgs>
  >;
};

export type QueryResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = {
  inbox?: Resolver<
    Array<ResolversTypes["Email"]>,
    ParentType,
    ContextType,
    RequireFields<QueryinboxArgs, "skip" | "take">
  >;
  me?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  sentEmail?: Resolver<
    Array<Maybe<ResolversTypes["Email"]>>,
    ParentType,
    ContextType,
    RequireFields<QuerysentEmailArgs, "skip" | "take">
  >;
};

export type UserResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes["User"] = ResolversParentTypes["User"],
> = {
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  firstName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  receivedEmails?: Resolver<
    Array<ResolversTypes["Email"]>,
    ParentType,
    ContextType
  >;
  sentEmails?: Resolver<
    Array<ResolversTypes["Email"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = GraphQLContext> = {
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  Email?: EmailResolvers<ContextType>;
  MarkAsReadPayload?: MarkAsReadPayloadResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};
