import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { isNgContainer } from '@angular/compiler';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients:Ingredient[] = this.shopSvc.getIngredients();
  ingredient: Ingredient = new Ingredient('',0);

  constructor(private shopSvc : ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shopSvc.getIngredients();
    this.shopSvc.ingredientsChanged.subscribe(
      (ing: Ingredient[]) => {
        this.ingredients = ing;
      }
    );
  }


  onClickIngredientItem(ingredient) {
    console.log('ingredient click ' + ingredient.name );
    this.ingredient = ingredient;
  }
}
  