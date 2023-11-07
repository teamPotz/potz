import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getOrders(req, res) {
  //...
}

export async function getOrderById(req, res) {
  // ...
}

export async function createOrder(req, res) {
  // ...
}

export async function updateOrder(req, res) {
  // ...
}

export async function deleteOrder(req, res) {
  // ...
}

// 입금 확인
export async function confirmDeposit(req, res) {
  // ...
}
