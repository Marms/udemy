import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
    public name: string;
    public imagePath: string;
    public description: string;
    public ingredients: Ingredient[];

    constructor(name: string, description: string, imagePath: string, ing : Ingredient[]) {
      this.name = name;
      this.description = description;
      this.imagePath = imagePath;
      this.ingredients = ing;
    }

}