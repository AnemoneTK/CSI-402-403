import { Request, Response } from "express";
import tempAccount from "../model/tempAccount";

export const getAccount = async (req: Request, res: Response) => {
  try {
    const { index, isNext } = req.body;

    if (index === undefined) {
      return res.status(400).json({
        success: false,
        message: "Index is required",
      });
    }

    const currentIndex = parseInt(index);

    const totalUsers = await tempAccount.countDocuments();

    if (totalUsers === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    if (currentIndex < 0 || currentIndex >= totalUsers) {
      return res.status(400).json({
        success: false,
        message: "Index out of range",
        validRange: { min: 0, max: totalUsers - 1 },
      });
    }

    let targetIndex;

    if (isNext === undefined || isNext === null) {
      targetIndex = currentIndex;
    } else if (isNext === true) {
      if (currentIndex === totalUsers - 1) {
        const user = await tempAccount
          .findOne()
          .skip(currentIndex)
          .limit(1)
          .select("firstName lastName username email");

        return res.status(200).json({
          success: true,
          message: "Already at the last user",
          data: {
            user,
            currentIndex,
            totalUsers,
            isFirst: false,
            isLast: true,
          },
        });
      }
      targetIndex = currentIndex + 1;
    } else {
      if (currentIndex === 0) {
        const user = await tempAccount
          .findOne()
          .skip(currentIndex)
          .limit(1)
          .select("firstName lastName username email");

        return res.status(200).json({
          success: true,
          message: "Already at the first user",
          data: {
            user,
            currentIndex,
            totalUsers,
            isFirst: true,
            isLast: false,
          },
        });
      }
      targetIndex = currentIndex - 1;
    }

    const user = await tempAccount
      .findOne()
      .skip(targetIndex)
      .limit(1)
      .select("firstName lastName username email");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found at index: " + targetIndex,
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        user,
        currentIndex: targetIndex,
        totalUsers,
        isFirst: targetIndex === 0,
        isLast: targetIndex === totalUsers - 1,
      },
    });
  } catch (error) {
    console.error("Error fetching account:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
};
