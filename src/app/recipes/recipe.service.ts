import {Recipe} from './recipe.model';
import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs/Subject';

/** Manage recipe */
@Injectable()
export class RecipeService {

  recipeChanged: Subject<Recipe[]> = new Subject();

  //  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [

  ];

  constructor(private shopSvc: ShoppingListService) {
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

  addToShoppingList(ings: Ingredient[]) {
    this.shopSvc.pushAllIngredients(ings);
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
