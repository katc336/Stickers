const prisma = require("./client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;
const seed = async () => {
    console.log("Seeding the database.");
    await prisma.lesson.deleteMany();
    await prisma.student.deleteMany();
    await prisma.class.deleteMany();
    await prisma.user.deleteMany();

    try {

    } catch (error) {
        console.error(error)
    }
    console.log("Database seeded!")
}

seed().then(async () => {
    await prisma.$disconnect();
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect();
    process.exit(1)
})