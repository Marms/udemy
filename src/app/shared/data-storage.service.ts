import {Injectable} from '@angular/core';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import 'rxjs/add/operator/map';
import {AuthService} from '../auth/auth.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DataStorageService {

  url: string;

  constructor(private httpClient: HttpClient,
              private recipeSvc: RecipeService,
              private authSvc: AuthService) {
    this.url = 'https://ng-recipe-book-5cc84.firebaseio.com/';
  }

  saveRecipes() {
    const tk: string = this.authSvc.getToken();
    return this.httpClient.put(this.url + 'recipes.json?auth=' + tk, this.recipeSvc.getRecipes());
  }

  getRecipes() {
    const tk: string = this.authSvc.getToken();
    this.httpClient.get<Recipe[]>(this.url + 'recipes.json?auth=' + tk)
      .map((recipes: Recipe[]) => {
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
