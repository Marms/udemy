import {Recipe} from '../recipe.model';
import * as RecipesActions from './recipe.actions';
import {AppState} from '../../store/app.reducer';

export interface FeatureState extends AppState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
}

const initialeState: State = {
  recipes: [{
    name: 'name',
    description: 'description',
    imagePath: 'https://cdn.sallysbakingaddiction.com/wp-content/uploads/2018/07/best-black-bean-burgers-2-600x900.jpg',
    ingredients: [{name: 'buns', amount: 2}]
  }]
};

export function recipeReducers(state = initialeState, action) {
  switch (action.type) {
    case (RecipesActions.SET_RECIPES) :
      return {
        ...state, recipes: [...action.payload]
      };
    case (RecipesActions.ADD_RECIPE) :
      const recipe: Recipe = action.payload;
      return {
        ...state, recipes: [...state.recipes, recipe]
      };
    case (RecipesActions.MAJ_RECIPE) :
      const recipes = state.recipes;
      recipes[action.payload.index] = action.payload.updatedRecipe;

      return {...state, recipes: recipes};
    case (RecipesActions.DEL_RECIPE):
      const oldRecipes = [...state.recipes];
      oldRecipes.splice(action.payload);
      return {...state, recipes: oldRecipes};
    default:
      return state;
  }
}
