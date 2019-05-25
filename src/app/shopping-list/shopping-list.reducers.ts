import {Action} from '@ngrx/store';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';

const initialState = {ingredients: []}; // etat par defaut


export function shoppingListReducers(state = initialState, action: Action) {

  switch (action.type) {
    case ADD_INGREDIENT: // je veux update mon etat en ajoutant un ingredient
      return {
        ...state, ingredients: [...state.ingredients, action]
      };
  }

  return state;
}
