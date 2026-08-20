import { Router, type Request, type Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({
    status: "success",
    data: [{ id: 1, name: "Usuario Demo" }],
  });
});

export default router;
