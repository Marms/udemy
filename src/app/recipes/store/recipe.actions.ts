import {Action} from '@ngrx/store';
import {Recipe} from '../recipe.model';

export const SET_RECIPES = 'SET_RECIPES';
export const ADD_RECIPE = 'ADD_RECIPE';
export const MAJ_RECIPE = 'MAJ_RECIPE';
export const DEL_RECIPE = 'DEL_RECIPE';


export class SetRecipes implements Action {
  readonly type = SET_RECIPES;

  constructor(public payload: Recipe[]) {
  }
}

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;

  constructor(public payload: Recipe) {
  }
}

export class MajRecipe implements Action {
  readonly type = MAJ_RECIPE;

  constructor(public payload: { index: number, updatedRecipe: Recipe }) {
  }
}

export class DelRecipe implements Action {
  readonly type = DEL_RECIPE;
  constructor(public payload: number) {
  }
}

export type RecipeActions = SetRecipes | AddRecipe | MajRecipe | DelRecipe;
