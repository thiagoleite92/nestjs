import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();
async function main() {
  await prisma.user.createMany({
    data: [
      {
        email: 'admin@admin.com',
        name: 'Administrador da Silva',
        password: await bcrypt.hash('Admin@123', 1),
        role: 'ADMIN',
      },
      {
        email: 'piloto@piloto.com',
        name: 'Senhor Piloto',
        password: await bcrypt.hash('Piloto@123', 1),
        role: 'PILOT',
        isActive: false,
      },
    ],
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
