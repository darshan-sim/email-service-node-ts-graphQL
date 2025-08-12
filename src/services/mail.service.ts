import { GraphQLError } from "graphql";
import { prisma } from "../context";
import { SendEmail } from "../validations/mail.validation";
import errorMessage from "../constant/error";
import { pubSub } from "../pubsub";

const EMAIL_INCLUDE = {
  sender: true,
  receiver: true,
};

export default class MailService {
  static async sentEmails(
    userId: string,
    take: number = 10,
    skip: number = 0,
    filters?: SentFilters,
  ) {
    const userEmailsSent = await prisma.email.findMany({
      skip,
      where: {
        senderId: userId,
        ...filters,
      },
      include: EMAIL_INCLUDE,
      take,
    });
    return userEmailsSent;
  }

  static async receivedEmails(
    userId: string,
    take: number = 10,
    skip: number = 0,
    filters?: ReceiveFilters,
  ) {
    const userEmailsSent = await prisma.email.findMany({
      skip,
      where: {
        receiverId: userId,
        ...filters,
      },
      include: EMAIL_INCLUDE,
      take,
    });
    return userEmailsSent;
  }

  static async sendEmail(senderId: string, input: SendEmail) {
    const { to, subject, body } = input;
    const receiver = await prisma.user.findUnique({
      where: {
        email: to,
      },
    });
    if (!receiver) {
      throw new GraphQLError(errorMessage.EMAIL_RECEIVER_NOT_FOUND);
    }
    const email = await prisma.email.create({
      data: {
        senderId,
        receiverId: receiver.id,
        subject,
        body,
      },
      include: EMAIL_INCLUDE,
    });
    pubSub.publish("NEW_EMAIL", {
      userId: receiver.id,
      email,
    });
    return email;
  }

  static async markAsRead(userId: string, ids: string[]) {
    const markAllAsRead = ids.length === 0;
    const emails = await prisma.email.updateMany({
      data: {
        read: true,
      },
      where: {
        read: false,
        receiverId: userId,
        ...(!markAllAsRead && {
          id: {
            in: ids,
          },
        }),
      },
    });
    return emails.count;
  }
}

export interface EmailFilters {
  subject?: string;
  read?: boolean;
}

export interface SentFilters extends EmailFilters {
  receiver?: {
    email: string;
  };
}

export interface ReceiveFilters extends EmailFilters {
  sender?: {
    email: string;
  };
}
