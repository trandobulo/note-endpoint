import express, { Router, Request, Response } from "express";
import notesServices from "../services/notesServices";
import notesRepository from "../repositories/notesRepository";

const router: Router = express.Router();

router
  .route("/")
  .post((req: Request, res: Response) => {
    try {
      notesServices.addNote(req.body);
      res.send(`Note added`);
    } catch (err: any) {
      res.status(500).json({ name: err.name, message: err.message });
    }
  })
  .get((req: Request, res: Response) => res.json(notesServices.getAllNotes()));

router.route("/stats").get((req: Request, res: Response) => {
  const stats = notesServices.getStats();
  res.send(
    `Statistic: there are ${stats.active} active & ${stats.archived} archived notes`
  );
});

router
  .route("/:id")
  .delete((req: Request, res: Response) => {
    try {
      const id = req.params.id;
      notesServices.deleteNote(id);
      res.send(`Note id: ${id} deleted,`);
    } catch (err: any) {
      res.status(500).json({ name: err.name, message: err.message });
    }
  })

  .patch((req: Request, res: Response) => {
    const id = req.params.id;
    try {
      notesServices.editNote(req.body, id);
      res.send(`Note with id: ${id} was edited`);
    } catch (err: any) {
      res.status(500).json({ name: err.name, message: err.message });
    }
  })

  .get((req: Request, res: Response) => {
    try {
      res.json(notesServices.getNote(req.params.id));
    } catch (err: any) {
      res.status(500).json({ name: err.name, message: err.message });
    }
  });

export default router;
