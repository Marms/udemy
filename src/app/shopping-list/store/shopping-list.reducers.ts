import {Action} from '@ngrx/store';
import {Ingredient} from '../../shared/ingredient.model';
import * as ShoppingListAction from './shopping-list.actions';

const initialState = {ingredients: [new Ingredient('name', 12), new Ingredient('test', 1)]}; // etat par defaut


export function shoppingListReducers(state = initialState, action: ShoppingListAction.ShoppingListActions) {

  switch (action.type) {
    case ShoppingListAction.ADD_INGREDIENT: // je veux update mon etat en ajoutant un ingredient
      return {
        ...state, ingredients: [...state.ingredients, action.payload]
      };
    default:
      return state;
  }
}
