import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { title, content } = req.body;
  const result = await prisma.board.create({
    data: {
      title: title,
      content: content,
    },
  });
  res.json(result);
}
