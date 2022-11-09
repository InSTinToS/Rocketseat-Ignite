import { PrismaClient } from '@prisma/client'
import { uuid } from 'uuidv4'

let created: any
const name = uuid()
const prisma = new PrismaClient()
const teacherName = uuid()

describe('Teachers', () => {
  it('Should be able to create a teacher by creating a course', async () => {
    created = await prisma.courses.create({
      data: {
        name,
        duration: 200,
        description: 'Curso excelente de NodeJS',
        teacher: { create: { name: teacherName } }
      }
    })

    const found = await prisma.courses.findUnique({ where: { name } })

    const foundTeacher = await prisma.teachers.findUnique({
      where: { name: teacherName }
    })

    expect(created).toEqual(found)
    expect(found?.teacherId).toBe(foundTeacher?.id)
  })

  it('Should delete Teacher when delete Course because onDelete is Cascade', async () => {
    await prisma.courses.delete({ where: { name } })

    expect(prisma.teachers.findUnique({ where: { name: teacherName } })).rejects
  })

  it('Should be able to create a teacher and connect a course', async () => {
    created = await prisma.courses.create({
      data: { name, duration: 200, description: 'Curso excelente de NodeJS' }
    })

    const createdTeacher = await prisma.teachers.create({
      data: { name, course: { connect: { name } } }
    })

    const found = await prisma.courses.findUnique({ where: { name } })

    expect(found?.teacherId).toBe(createdTeacher.id)
  })

  it('Should be able to get teacher info by courses', async () => {
    const found = await prisma.courses.findUnique({
      where: { name },
      include: { teacher: true }
    })

    expect(found).toHaveProperty(['teacher', 'id'])
  })
})
