import { Request, Response } from "express";
import dayjs from "dayjs";
import jwt, { JwtPayload } from "jsonwebtoken";

import tempAccount from "../model/tempAccount";
import History from "../model/history";
import { emit } from "process";

const JWT_SECRET = process.env.SECRET_KEY || "CSI402";

export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, birthDate, idCard, email } = req.body;

    if (!firstName || !lastName || !birthDate || !idCard || !email) {
      return res.status(400).json({
        status: 400,
        msg: "error",
        detail: "กรุณากรอกข้อมูลให้ครบถ้วน",
      });
    }
    const dayPart = dayjs().format("YYYYMMDD");
    const todayRegex = new RegExp(`^TA${dayPart}`);

    const count = await tempAccount.countDocuments({
      username: todayRegex,
    });

    const username = `TA${dayjs().format("YYYYMMDD")}${count + 1}`;
    const password = idCard.slice(-6);

    const newAccount = {
      firstName,
      lastName,
      birthDate,
      idCard,
      email,
      username,
      password,
    };
    const result = await tempAccount.collection.insertOne(newAccount);
    if (result) {
      res.status(200).json({
        status: 200,
        msg: "success",
        data: {
          username: username,
          password: password,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      msg: error,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        status: 400,
        msg: "error",
        detail: "กรุณากรอกข้อมูลให้ครบถ้วน",
      });
    }

    const result = await tempAccount.findOne({ username });
    if (!result) {
      res.status(404).json({
        status: 404,
        msg: "username not found",
      });
    } else {
      if (password !== result.password) {
        res.status(401).json({
          status: 401,
          msg: "error",
          detail: "wrong password",
        });
      }
    }

    if (result) {
      const token = jwt.sign(
        {
          username: result.username,
          password: result.password,
        },
        JWT_SECRET,
        { expiresIn: "1m" }
      );

      if (token) {
        const history = await History.collection.insertOne({
          userId: result._id,
          token: token,
        });

        if (history) {
          res.status(200).json({
            status: 200,
            msg: "success",
            data: {
              token: token,
              user: {
                name: `${result.firstName} ${result.lastName}`,
                email: result.email,
              },
            },
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      msg: error,
    });
  }
};

export const history = async (req: Request, res: Response) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  try {
    if (!token) {
      return res.status(403).json({
        status: 403,
        msg: "Token not found",
      });
    }

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
      if (err) {
        res.status(401).json({
          status: 401,
          msg: "Token Error",
          err: err,
          token: token,
        });
      }
    });

    const result = await History.findOne({ token });

    if (result) {
      res.status(200).json({
        status: 200,
        msg: "success",
        data: {
          record: result._id,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      msg: error,
    });
  }
};
