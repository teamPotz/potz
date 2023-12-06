import { PrismaClient } from '@prisma/client';
import { createMessage, updateDepositMessage } from '../services/messages.js';

const prisma = new PrismaClient();

export async function createDeposit(req, res, next) {
  const { potId, depositor, amount } = req.body;

  try {
    let deposit, depositMessage;
    await prisma.$transaction(async (tx) => {
      deposit = await tx.deposit.create({
        data: {
          deliveryPotId: +potId,
          userId: req.user.id,
          amount: +amount,
          depositor: depositor,
          imageUrl: req.file?.filename || null,
        },
      });

      depositMessage = await createMessage(
        tx,
        'DEPOSIT',
        potId,
        req.user.id,
        deposit
      );
    });

    const io = req.app.get('io');
    io.of('/chat').to(potId.toString()).emit('message', depositMessage);

    io.of('/room').emit('updateLastMessage', {
      potId,
      message: depositMessage,
    });

    console.log('deposit message sent');
    res.status(201).json(deposit);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

// 입금 확인
export async function confirmDeposit(req, res, next) {
  const { depositId } = req.params;
  const { messageId } = req.body;

  try {
    // 1. check if deposit exists
    const existingDeposit = await prisma.deposit.findUnique({
      where: { id: +depositId },
    });
    if (!existingDeposit) {
      throw new Error(`cant find deposit #${depositId}`);
    }
    if (existingDeposit.depositConfirmed) {
      throw new Error(`already confirmed deposit #${depositId}`);
    }

    const potId = existingDeposit.deliveryPotId;

    // 2. 방장 여부 확인
    const pot = await prisma.deliveryPot.findUnique({
      where: { id: potId },
    });
    if (!pot) {
      throw new Error(`cant find delivery pot #${potId}`);
    }
    if (pot.potMasterId !== req.user.id) {
      throw new Error('only pot master can confirm deposit');
    }

    // 3. 입금확인 트랜잭션(입금확인처리->입금메시지 수정->입금확인메시지 생성)
    let depositConfirmMessage;
    await prisma.$transaction(async (tx) => {
      // 3-1. update deposit
      const deposit = await tx.deposit.update({
        where: { id: +depositId },
        data: { depositConfirmed: true },
        select: {
          id: true,
          depositConfirmed: true,
          user: { select: { name: true } },
        },
      });

      // 3-2. update deposit message
      await updateDepositMessage(tx, messageId, true);

      // 3-3. create deposit confirm message
      depositConfirmMessage = await createMessage(
        tx,
        'DEPOSIT_CONFIRM',
        potId,
        req.user.id,
        deposit
      );
    });

    const io = req.app.get('io');
    io.of('/chat').to(potId.toString()).emit('message', depositConfirmMessage);

    io.of('/room').emit('updateLastMessage', {
      potId,
      message: depositConfirmMessage,
    });

    console.log('deposit confirm message sent');
    res.status(201).json(depositConfirmMessage);
  } catch (error) {
    console.error(error);
    next(error);
  }
}
