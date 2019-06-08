import {Ingredient} from '../../shared/ingredient.model';
import * as ShoppingListAction from './shopping-list.actions';

export interface AppState {
  shoppingList: State;
}

export interface State {
  ingredients: Ingredient[];
  editIngredient: Ingredient;
  editIngredientIndex: number;
}

const initialState: State = {
  ingredients: [new Ingredient('name', 12), new Ingredient('test', 1)],
  editIngredient: null,
  editIngredientIndex: -1

}; // etat par defaut


export function shoppingListReducers(state = initialState, action: ShoppingListAction.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListAction.ADD_INGREDIENT: // je veux update mon etat en ajoutant un ingredient
      return {
        ...state, ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListAction.ADD_INGREDIENTS:
      return {
        ...state, ingredients: [...state.ingredients, ...action.payload]
      };
    case ShoppingListAction.MAJ_INGREDIENT:
      const ing = [...state.ingredients];
      ing[state.editIngredientIndex] = action.payload.ingredient;

      return {
        ...state, ingredients: ing, editIngredientIndex: -1, editIngredient: null
      };
    case ShoppingListAction.DEL_INGREDIENT:
      console.log(state.editIngredientIndex)
      const ingredients = state.ingredients;
      ingredients.splice(state.editIngredientIndex, 1);
      return {
        ...state, ingredients: ingredients, editIngredientIndex: -1, editIngredient: null
      };
    case ShoppingListAction.START_EDIT:
      return {
        ...state, editIngredient: state.ingredients[action.payload.id], editIngredientIndex: action.payload.id
      };
    case ShoppingListAction.STOP_EDIT:
      return {
        ...state, editIngredientIndex: -1, editIngredient: null
      };
    default:
      return state;
  }
}
