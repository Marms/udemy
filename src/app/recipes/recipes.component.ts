import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  recipeSelected: Recipe;

  constructor(private recipeSvc: RecipeService) { }
  

  ngOnInit() {
  /*  this.recipeSvc.recipeSelected.subscribe(
      (recipe: Recipe) => {
        this.recipeSelected = recipe;
      }

    );*/
  }

}
