import express, { Router, Request, Response } from "express";
import notesServices from "../services/notesServices";

const router: Router = express.Router();

router
  .route("/")
  .post((req: Request, res: Response) => {
    try {
      notesServices.addNote(req.body);
      res.status(201).send({
        message: "Note added",
        note: notesServices.getAllNotes()[
          notesServices.getAllNotes().length - 1
        ],
      });
    } catch (err: any) {
      res.status(500).json({ error: "Input data isn't correct" });
    }
  })
  .get((req: Request, res: Response) => {
    try {
      res.json(notesServices.getAllNotes());
    } catch (err) {
      res.status(500).json({ error: "Something went wrong..." });
    }
  });

router.route("/stats").get((req: Request, res: Response) => {
  try {
    const stats = notesServices.getStats();
    res.json({ activeNotes: stats.active, archivedNotes: stats.archived });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong..." });
  }
});

router
  .route("/:id")
  .delete((req: Request, res: Response) => {
    try {
      const id = req.params.id;
      notesServices.deleteNote(id);
      res.json({ message: `Note id: ${id} deleted,` });
    } catch (err: any) {
      res.status(500).json({ error: "Input data isn't correct" });
    }
  })

  .patch((req: Request, res: Response) => {
    const id = req.params.id;
    try {
      notesServices.editNote(req.body, id);
      res.json({
        message: `Note with id: ${id} was edited`,
        note: notesServices.getNote(id),
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  })

  .get((req: Request, res: Response) => {
    try {
      res.json(notesServices.getNote(req.params.id));
    } catch (err: any) {
      res.status(500).json({ error: "Input data isn't correct" });
    }
  });

export default router;
