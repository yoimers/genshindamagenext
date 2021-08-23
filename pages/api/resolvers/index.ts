import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    boards: async (_: any, { take = 10, after }: { take: number; after: number }) => {
      try {
        const finalboard = await prisma.board.findMany({
          skip: 0,
          take: 1,
          orderBy: {
            id: 'asc',
          },
          select: {
            id: true,
          },
        });
        let boards;
        if (!after) {
          boards = await prisma.board.findMany({
            take,
            orderBy: {
              id: 'desc',
            },
          });
        } else {
          boards = await prisma.board.findMany({
            take,
            skip: 1,
            cursor: {
              id: after,
            },
            orderBy: {
              id: 'desc',
            },
          });
        }
        const cursor = boards[boards.length - 1].id;
        const hasMore = boards[boards.length - 1].id === finalboard[0].id ? false : true;
        return {
          cursor,
          hasMore,
          boards,
        };
      } catch (err) {
        console.error(err);
      }
    },
    board: async (_: any, { id }: { id: string }) => {
      const board = await prisma.board.findFirst({
        where: {
          id: Number(id),
        },
        include: {
          comments: {
            include: {
              childcomments: true,
            },
          },
        },
      });
      return board;
    },
    comments: async (_: any, { id }: { id: string }) => {
      const comments = await prisma.comment.findMany({
        where: {
          boardId: Number(id),
        },
        include: {
          childcomments: true,
        },
      });
      return comments;
    },
  },
  Mutation: {
    createBoard: async (_: any, { title, content }: { title: string; content: string }) => {
      const board = await prisma.board.create({
        data: {
          title,
          content,
        },
      });
      const success = board ? true : false;
      return {
        success,
        board,
      };
    },
    createComment: async (
      _: any,
      {
        username,
        content,
        boardId,
        commentId = null,
      }: { username: string; content: string; boardId: number; commentId: number | null }
    ) => {
      const comment = await prisma.comment.create({
        data: {
          username,
          content,
          boardId,
          commentId,
        },
      });
      const success = comment ? true : false;
      return {
        success,
        comment,
      };
    },
  },
};
