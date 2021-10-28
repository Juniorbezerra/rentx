import { ICreateSpecificationDTO, ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { getRepository, Repository } from "typeorm";
import { Specification } from "../entities/Specification";


class SpecificationRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }
  async list(): Promise<Specification[]> {
    const specifications = await this.repository.find();
    return specifications;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ name });
    return specification;
  }

  async create({
    description,
    name,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({
      description,
      name,
    });

    await this.repository.save(specification);

    return specification;
  }
}

export { SpecificationRepository };
