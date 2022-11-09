import { PrismaClient } from '@prisma/client'
import { uuid } from 'uuidv4'
const prisma = new PrismaClient()

let created: any
const name = uuid()

describe('Courses', () => {
  it('Should be able to create a course', async () => {
    created = await prisma.courses.create({
      data: {
        name,
        duration: 200,
        description: 'Curso excelente de NodeJS'
      }
    })

    const found = await prisma.courses.findUnique({ where: { name } })

    expect(created).toEqual(found)
  })

  it('Should be able to update a course', async () => {
    const updated = await prisma.courses.update({
      where: { name },
      data: { duration: 300 }
    })

    expect(updated).toEqual({ ...created, duration: 300 })
  })

  it('Should be able to delete a course', async () => {
    await prisma.courses.delete({ where: { name } })

    expect(prisma.courses.findUnique({ where: { name } })).rejects
  })
})
