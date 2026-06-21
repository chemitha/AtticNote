import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

async function test() {
  try {
    const user = await prisma.user.findFirst();
    if (!user) return console.log("No user found");
    const note = await prisma.note.findFirst({ where: { user_id: user.id } });
    if (!note) return console.log("No note found");
    console.log("Note ID:", note.id);

    const blocks = [{
      id: "test-block-" + randomUUID(),
      type: "paragraph",
      content: [],
      children: []
    }];

    await prisma.$transaction(async (tx: any) => {
      await tx.block.deleteMany({
        where: { note_id: note.id }
      });

      const data = blocks.map((b: any, index: number) => ({
        id: b.id || randomUUID(),
        note_id: note.id,
        type: b.type,
        content: JSON.stringify(b),
        position: index,
        parent_block_id: null 
      }));

      if (data.length > 0) {
        await tx.block.createMany({ data });
      }
      
      await tx.note.update({
        where: { id: note.id },
        data: { updated_at: new Date() }
      });
    });

    console.log("Transaction succeeded!");
  } catch (err) {
    console.error("Error during transaction:", err);
  } finally {
    await prisma.$disconnect();
  }
}

test();
