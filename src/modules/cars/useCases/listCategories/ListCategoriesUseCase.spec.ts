import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "../createCategory/CreateCategoryUseCase";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";


let listCategoriesUseCase: ListCategoriesUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

describe("List categories", () => {
  beforeAll(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    listCategoriesUseCase = new ListCategoriesUseCase(
      categoriesRepositoryInMemory
    );
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory)
  });

  it("should be able to return a list of categories", async () => {
    const category1 = await createCategoryUseCase.execute({
      name: "teste1",
      description: "teste1",
    });
    const category2 = await createCategoryUseCase.execute({
      name: "teste2",
      description: "teste2",
    });

    const categories = await listCategoriesUseCase.execute();

    expect(categories).toEqual(expect.arrayContaining([category1, category2]));
  });
});
