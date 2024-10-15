'use server'

// import kysely from '@/kysely/db'
// import { sql } from 'kysely'
import prisma from '@/lib/prisma'
type Chat = {
  id: string
  title: string
  createdAt?: Date
  updatedAt?: Date
};
interface Record {
  type: string
  amount: string | number
  createdAt: Date
}

// export async function getAllChats(): Promise<Pick<Chat, 'id' | 'createdAt'>[]> {
  
//   const chats: Pick<Chat, 'id' | 'createdAt'>[] = await kysely
//     .selectFrom('Chat')
//     .select(['id', 'createdAt'])
//     .orderBy('createdAt', 'desc')
//     .limit(100)
//     .execute()

//   console.log('chats', chats)

//   return chats
// }

// export async function saveChat(chat: Chat) {
//   if (!chat.id) {
//     return null
//   }

//   const dateTime = new Date()
//   // upsert
//   await kysely
//     .insertInto('Chat')
//     .values({ ...chat, updatedAt: dateTime, createdAt: dateTime })
//     .onConflict((oc) => {
//       return oc
//         .column('id')
//         .doUpdateSet({
//           updatedAt: dateTime,
//         })
//     })
//     .executeTakeFirst()

//   return chat
// }

export async function getAllChats(): Promise<Pick<Chat, 'id' | 'createdAt'>[]> {
  const chats: Pick<Chat, 'id' | 'createdAt'>[] = (
    await prisma.chat.findMany({
      where: {},
      orderBy: { createdAt: 'desc' },
      take: 10
    })
  ).map((chat: any) => ({
    id: chat.id,
    createdAt: chat.createdAt
  }))

  return chats
}

export async function saveChat(chat: Chat) {
  if (!chat.id) {
    return null
  }

  // upsert
  const existingChat = await prisma.chat.findUnique({
    where: { id: chat.id }
  })
  const dateTime = new Date()
  const newChat = { ...chat, updatedAt: dateTime, createdAt: dateTime }
  if (existingChat) {
    await prisma.chat.update({
      where: { id: chat.id },
      data: chat
    })
  } else {
    await prisma.chat.create({
      data: newChat
    })
  }

  return chat
}

// export async function saveUser(user: any) {
  // const dateTime = new Date()
  // await prisma.user.upsert({
  //   where: {
  //     id: user.uid,
  //   },
  //   create: {
  //     id: user.uid,
  //     name: user.name,
  //     email: user.email,
  //     picture: user.picture,
  //     balance: 50.00,
  //     createdAt: dateTime,
  //     updatedAt: dateTime
  //   },
  //   update: {
  //     name: user.name,
  //     email: user.email,
  //     picture: user.picture,
  //     updatedAt: dateTime
  //   },
  // })
// }

export async function saveUser(user: any) {
  if (!user.uid) {
    return null
  }

  // upsert
  const existingUser = await prisma.user.findUnique({
    where: { id: user.uid }
  })
  const dateTime = new Date()
  const { uid, ...rest } = user;
  const newUser = { id: uid, ...rest, updatedAt: dateTime, createdAt: dateTime }
  if (!existingUser) {
    await prisma.user.create({
      data: newUser
    })
    // 建立初始账户
    const account = await prisma.account.create({
      data: {
        userId: uid,
        totalBalance: 50,
        giftTokens: 50
      }
    })
    // 赠送50积分
    const giftRecord = await prisma.giftRecord.create({
      data: {
        accountId: account.id,
        amount: 50,
        type: 'gift'
      }
    })

    return {
      ...newUser,
      account,
      gift: giftRecord
    }
  }
}

export async function main() {
  // 创建用户示例
  // const result = await saveUser({
  //   uid: 'utest1',
  //   name: 'jack_test',
  //   email: 'jack@example.com',
  // });
  // console.log(result)
  
  // 添加充值记录
  const rechargeTransaction = await prisma.$transaction([
    // 1. 创建充值记录
    prisma.rechargeRecord.create({
      data: {
        accountId: 1,
        amount: 100,
        orderNumber: 'ORD123456', // 生成或传入唯一订单号
        source: 'WeChat',         // 充值来源，如：支付宝、微信等
        status: 'COMPLETED',      // 充值状态：成功
      },
    }),
    // 2. 更新账户余额和充值代币
    prisma.account.update({
      where: { id: 1 },
      data: {
        totalBalance: {
          increment: 100, // 增加总余额
        },
        rechargeTokens: {
          increment: 100, // 增加充值代币余额
        },
      },
    }),
  ]);

  console.log('Recharge record created:', rechargeTransaction);
  
  // 添加消费记录示例
  const transaction = await prisma.$transaction([
    prisma.transactionRecord.create({
      data: {
        accountId: 1,
        amount: -10,
        type: 'video_analysis',
      },
    }),
    prisma.account.update({
      where: { id: 1 },
      data: {
        totalBalance: {
          decrement: 30,
        },
        giftTokens: {
          decrement: 30,
        },
      },
    }),
  ]);

  console.log('Transaction record created:', transaction);
}

export async function accountDetails(userId: string) {
  // 查询账户及其关联的收支记录
  const accountWithDetails = await prisma.account.findFirst({
    where: {
      userId: userId,
    },
    include: {
      gifts: true,            // 包含 GiftRecord 赠送记录
      recharges: true,        // 包含 RechargeRecord 充值记录
      transactions: true,     // 包含 TransactionRecord 消费记录
    },
  });

  // 确保账户存在
  if (!accountWithDetails) {
    throw new Error('Account not found for this user');
  }

  // 合并 GiftRecord、TransactionRecord 和 RechargeRecord
  const combinedRecords = [
    ...accountWithDetails.gifts.map(record => ({
      type: '赠送积分',                 // 赠送记录的类型
      amount: `+${record.amount}`,        // 积分变动（正数）
      createdAt: record.createdAt,        // 记录的时间
    })),
    ...accountWithDetails.transactions.map(record => ({
      type: `消耗积分-${record.type}`,    // 消费记录的类型
      amount: `${record.amount}`,              // 积分变动（负数）
      createdAt: record.createdAt,        // 记录的时间
    })),
    ...accountWithDetails.recharges
      .filter(record => record.status === 'COMPLETED') // 只包含已完成的充值
      .map(record => ({
        type: `充值积分-${record.source}`, // 充值记录的类型
        amount: `+${record.amount}`,       // 积分变动（正数）
        createdAt: record.createdAt,       // 记录的时间
      })),
  ];

  // 按照时间进行排序
  const sortedRecords = combinedRecords.sort((a: Record, b: Record) => {
    return b.createdAt.getTime() - a.createdAt.getTime();
  });

  // 格式化输出
  const formattedRecords = sortedRecords.map(record => ({
    type: record.type,
    amount: record.amount,
    createdAt: new Date(record.createdAt).toLocaleString(),
  }));

  return formattedRecords
}