import express from "express";
import { Request, Response } from "express";
import notesRouter from "./notes";
const router = express.Router();

router.use("/notes", notesRouter);

router.route("/").get(function (req: Request, res: Response) {
  res.status(404).end();
});

export default router;
