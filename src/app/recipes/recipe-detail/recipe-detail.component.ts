import {Input, Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';
import { Route, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
//  @Input('recipeSelected') recipe: Recipe;
  
  constructor(private recSvc: RecipeService) { }

  ngOnInit() {
   var name = "te"; 
  //var name: string = this.router.snapshot.params['name'];
    console.log(name);
    //this.recipe = this.recSvc.getRecipe(name);
    console.log('test');
  }

  onAddToShoppingList() {
    //this.recSvc.addToShoppingList(this.recipe.ingredients);
  }
}
