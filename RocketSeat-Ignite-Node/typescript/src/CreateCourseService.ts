interface Execute {
  name: string;
  duration: number;
  educator: string;
}

class CreateCourseService {
  execute({ duration, educator, name }: Execute) {
    console.log(name, duration, educator);
  }
}

export default new CreateCourseService();
