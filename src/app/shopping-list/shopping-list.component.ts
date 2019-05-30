import {Component, OnInit, OnDestroy} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<{ingredients: Ingredient[]}>;
  ingredient: Ingredient = new Ingredient('', 0);

  constructor( private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');
  }

  onEditItem(index: number) {
    this.store.dispatch( new ShoppingListActions.StartEdit({id: index}));
  }

  onClickIngredientItem(ingredient) {
    this.ingredient = ingredient;
  }
}
