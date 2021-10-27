import { AppError } from "@errors/AppError";
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";


let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
describe("Create category", () => {
  beforeAll(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("should be able to create a new category", async () => {
    const user = await createCategoryUseCase.execute({
      name: "category name test",
      description: "category description test",
    });

    expect(user).toHaveProperty("id");
  });

  it("should not be able to create a new category with name exists", async () => {
    expect(async () => {
      await createCategoryUseCase.execute({
        name: "category name test",
        description: "category description test",
      });
      await createCategoryUseCase.execute({
        name: "category name test",
        description: "category description test",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
