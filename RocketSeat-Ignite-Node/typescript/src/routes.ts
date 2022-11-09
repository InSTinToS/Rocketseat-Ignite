import { Request, response, Response } from "express";
import CreateCourseService from "./CreateCourseService";

const createCourse = (req: Request, res: Response) => {
  CreateCourseService.execute({
    duration: 10,
    name: "NodeJS",
    educator: "Dani",
  });

  return response.send();
};

export { createCourse };
