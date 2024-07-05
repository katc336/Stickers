const prisma = require("./client");
const bcrypt = require("bcrypt");
const { faker } = require("@faker-js/faker");
const SALT_COUNT = 10;

const passwordHash = async () => {
    adminPass = await bcrypt.hashSync("12345678", SALT_COUNT);
    return adminPass;
}

const generateRandomCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = "";
    for (let i = 0; i < 8; i++) {
        code = code + characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}

passwordHash();

const seed = async () => {
    console.log("Seeding the database.");
    // await prisma.studentAccount.deleteMany();
    // await prisma.assignment.deleteMany();
    // await prisma.submission.deleteMany();
    await prisma.studentProgress.deleteMany();
    await prisma.learningObjective.deleteMany();
    await prisma.lesson.deleteMany();
    await prisma.parent.deleteMany();
    await prisma.student.deleteMany();
    await prisma.class.deleteMany();
    await prisma.user.deleteMany();

    try {
        //<-------------------TEST USER------------------->
        const testAccount = await prisma.user.create({
            data: {
                name: "Teacher",
                username: "testAccount",
                password: adminPass.toString(),
            },
        });

        // Create fake data for Class model
        const english = await prisma.class.create({
            data: {
                name: "ELA07",
                teacher: { connect: { id: testAccount.id } },
                students: {
                    create: [
                        { name: faker.person.firstName(), studentCode: generateRandomCode() },
                        { name: faker.person.firstName(), studentCode: generateRandomCode() },
                        { name: faker.person.firstName(), studentCode: generateRandomCode() },
                        { name: faker.person.firstName(), studentCode: generateRandomCode() },
                        { name: faker.person.firstName(), studentCode: generateRandomCode() },
                        { name: faker.person.firstName(), studentCode: generateRandomCode() },
                        { name: faker.person.firstName(), studentCode: generateRandomCode() },
                        { name: faker.person.firstName(), studentCode: generateRandomCode() },
                        { name: faker.person.firstName(), studentCode: generateRandomCode() },
                        { name: faker.person.firstName(), studentCode: generateRandomCode() },
                        { name: faker.person.firstName(), studentCode: generateRandomCode() },
                        { name: faker.person.firstName(), studentCode: generateRandomCode() },
                        { name: faker.person.firstName(), studentCode: generateRandomCode() },
                        { name: faker.person.firstName(), studentCode: generateRandomCode() },
                        { name: faker.person.firstName(), studentCode: generateRandomCode() },
                        { name: faker.person.firstName(), studentCode: generateRandomCode() },
                        { name: faker.person.firstName(), studentCode: generateRandomCode() },
                        { name: faker.person.firstName(), studentCode: generateRandomCode() },
                        { name: faker.person.firstName(), studentCode: generateRandomCode() },
                        { name: faker.person.firstName(), studentCode: generateRandomCode() },
                    ]
                },
                lessons: {
                    create: [
                        { lessonName: "Analyze Characters with Textual Evidence" },
                        { lessonName: "Writing a Personal Narrative" },
                        { lessonName: "Poetry Structure and Meaning" },
                        { lessonName: "Figurative Language: Metaphors and Similes" },
                        { lessonName: "Analyzing Informational Texts" },
                        { lessonName: "Historical Fiction Analysis" },
                        { lessonName: "Understanding Author's Perspective" },
                    ]
                },
            },
        });
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