import {Recipe} from './recipe.model';
import { Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

/** Manage recipeState */
@Injectable()
export class RecipeService {

  recipeChanged: Subject<Recipe[]> = new Subject();

  private recipes: Recipe[] = [

  ];

  constructor() {
  }

  getRecipes() {
    return this.recipes.slice(); // retourne une copie du tableau
  }

  getRecipe(id: number): Recipe {
    return this.recipes[id];
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.recipeChanged.next(this.recipes);
  }

  setRecipe(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes);
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeChanged.next(this.recipes);
  }

}
