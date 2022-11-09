import { getRepository, Repository } from "typeorm";

import { User } from "../../../users/entities/User";
import { Game } from "../../entities/Game";

import { IGamesRepository } from "../IGamesRepository";

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    const queryBuilder = this.repository
      .createQueryBuilder("game")
      .where("game.title ILIKE :title", { title: `%${param}%` })
      .getMany();

    return queryBuilder;
  }

  async countAllGames(): Promise<any> {
    const count = (await this.repository.query(
      "SELECT COUNT(*) FROM games"
    )) as string;

    return count;
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const game = await this.repository
      .createQueryBuilder("game")
      .where("game.id=:id", { id })
      .leftJoinAndSelect("game.users", "user")
      .getOne();

    console.log(game);

    if (!game) throw new Error("error");

    return game.users;
  }
}
