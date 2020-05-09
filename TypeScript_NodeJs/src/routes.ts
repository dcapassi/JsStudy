import { Request, Response } from "express";
export const helloWorld = (req: Request, res: Response) => {
  return res.json({ message: "Hello World" });
};
