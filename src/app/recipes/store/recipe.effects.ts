import {Actions, Effect, ofType} from '@ngrx/effects';
import * as RecipeActions from './recipe.actions';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {withLatestFrom, map, switchMap} from 'rxjs/operators';

import {Recipe} from '../recipe.model';
import {Injectable} from '@angular/core';
import * as fromRecipes from './recipe.reducers';
import {Store} from '@ngrx/store';

@Injectable()
export class RecipeEffects {
  private url = 'https://ng-recipe-book-5cc84.firebaseio.com/';
  @Effect()
  fetchRecipes = this.action$.pipe(
    ofType(RecipeActions.FETCH_RECIPES))
    .pipe(
      switchMap(() => {
        return this.httpClient.get<Recipe[]>(this.url + 'recipes.json'
          , {
            observe: 'body', // response...
            responseType: 'json'// text...
          }
        );
      }), map((recipes: Recipe[]) => {
        for (const recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return {type: RecipeActions.SET_RECIPES, payload: recipes};
      }));

  @Effect({dispatch: false})
  storeRecipes = this.action$.pipe(
    ofType(RecipeActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([action, state]) => {
      const req = new HttpRequest('PUT', this.url + 'recipes.json', state.recipes, {reportProgress: true});
      return this.httpClient.request(req);
    }));

  constructor(private action$: Actions, private httpClient: HttpClient, private store: Store<fromRecipes.FeatureState>) {
  }
}
