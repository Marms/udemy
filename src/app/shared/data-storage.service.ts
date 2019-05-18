import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import 'rxjs/add/operator/map';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class DataStorageService {

  url: string;

  constructor(private http: Http,
              private recipeSvc: RecipeService,
              private authSvc: AuthService) {
    this.url = 'https://ng-recipe-book-5cc84.firebaseio.com/';
  }

  saveRecipes() {
    const tk: string = this.authSvc.getToken();
    return this.http.put(this.url + 'recipes.json?auth=' + tk, this.recipeSvc.getRecipes());
  }

  getRecipes() {
    const tk: string = this.authSvc.getToken();
    this.http.get(this.url + 'recipes.json?auth=' + tk)
      .map((response: Response) => {
        const recipes: Recipe[] = response.json();
        for (const recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      })
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeSvc.setRecipe(recipes);
        }
      );
  }
}
