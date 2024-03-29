import { NextFunction, Request, Response } from "express";
import prisma from "../prisma/client";
import { RequestExtended } from "../middleware/verifyAuth";
import { PushTokenSchema } from "../../shared/zodSchemas";
import {
  EventWithResponses,
  sendEventNotifications,
  getEventsWithinTimeRange,
  pushNotificationTest,
} from "../services/pushNotification.service";
import { ExpoPushTicket, ExpoPushToken } from "expo-server-sdk";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const testNotification = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    const pushToken: ExpoPushToken = PushTokenSchema.parse(
      req.params,
    ).pushToken;
    pushNotificationTest(pushToken);
    res.status(200).json({
      success: true,
      message: "Push notification sent...",
    });
  } catch (error: any) {
    next(error);
  }
};

export const storePushToken = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    const loggedInUserId = req.userId;
    const { pushToken } = PushTokenSchema.parse(req.body);
    console.log("expoPushToken: ", pushToken);

    // Create a new push token for the user
    await prisma.pushToken.create({
      data: {
        pushToken,
        userId: loggedInUserId!,
      },
    });

    res.status(200).json({
      success: true,
      message: "Push Token stored successfully",
    });
  } catch (error: any) {
    // handle unique constraint violation (assuming unique constraint on userId & pushToken)
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code == "P2002" // unique constrained violation error code
    ) {
      return res.status(409).json({
        success: false,
        error: "Push token already exists for this user",
      });
    } else {
      // Handle unexpected errors
      next(error);
    }
  }
};

export const sendUpcomingEventRemindersTest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // send notification for events happening in less than 12 hours but no fewer than 6 hours from now
    const scheduleIntervalInMinutes: number = 6 * 60;
    const reminderOffsetInMinutes: number = 12 * 60; // Approximately how long before an event starts to send notification
    if (scheduleIntervalInMinutes >= reminderOffsetInMinutes) {
      console.error(
        "Error sending event reminders: Invalid time interval or offset",
      );
      return;
    }
    const now = new Date();
    // toTime is the latest time before an event starts for which a notification will be sent out
    const toTime = new Date(now.getTime() + reminderOffsetInMinutes * 60000);
    const fromTime = new Date(
      toTime.getTime() - scheduleIntervalInMinutes * 60000,
    );

    const upcomingEventsWithResponses: EventWithResponses[] =
      await getEventsWithinTimeRange(fromTime, toTime);

    if (upcomingEventsWithResponses.length === 0) {
      console.log("No upcoming events");
      res.status(200).json({
        success: true,
        message: "No upcoming events",
      });
      return;
    }

    const tickets: ExpoPushTicket[] = await sendEventNotifications(
      upcomingEventsWithResponses,
    );
    res.status(200).json({
      success: true,
      message: "Upcoming event reminder notifications sent",
    });
  } catch (error: any) {
    next(error);
  }
};
