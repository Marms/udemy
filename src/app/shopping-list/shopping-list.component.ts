import {Component, OnInit, OnDestroy} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
import {Subscription} from 'rxjs/Subscription';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  shoppingList: Observable<{ingredients: Ingredient[]}>;
  ingredient: Ingredient = new Ingredient('', 0);
  ingredientSubscription: Subscription;

  constructor(private shopSvc: ShoppingListService, private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>) {
  }

  ngOnInit() {
    this.shoppingList = this.store.select('shoppingList');
  }

  onEditItem(index: number) {
    this.shopSvc.startedEditing.next(index);
  }

  ngOnDestroy() {
 //   this.ingredientSubscription.unsubscribe();
  }

  onClickIngredientItem(ingredient) {
    this.ingredient = ingredient;
  }
}
