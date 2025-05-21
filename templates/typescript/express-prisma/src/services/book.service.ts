import { PrismaClient, Book } from '@prisma/client';

export const getAllBooksService = async (prisma: PrismaClient): Promise<Book[]> => {
  return prisma.book.findMany();
};

export const createBookService = async (prisma: PrismaClient, data: { title: string; author: string }): Promise<Book> => {
  return prisma.book.create({ data });
};

export const getBookByIdService = async (prisma: PrismaClient, id: number): Promise<Book | null> => {
  return prisma.book.findUnique({ where: { id } });
};

export const updateBookService = async (prisma: PrismaClient, id: number, data: { title?: string; author?: string }): Promise<Book | null> => {
  return prisma.book.update({ where: { id }, data });
};

export const deleteBookService = async (prisma: PrismaClient, id: number): Promise<Book | null> => {
  return prisma.book.delete({ where: { id } });
};
