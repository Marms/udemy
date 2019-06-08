import {OnChanges, Input, Output, EventEmitter, ElementRef, ViewChild, Component, OnInit, OnDestroy} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnChanges, OnDestroy {
  @Input() ingredient: Ingredient;
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editIngredient: Ingredient;


  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.ingredient = new Ingredient('', 0);

    this.subscription = this.store.select('shoppingList').subscribe(
      (action) => {
        if (action.editIngredientIndex > -1) {
          this.editMode = true;
          this.editIngredient = action.editIngredient;
          this.slForm.setValue({
            'name': this.editIngredient.name,
            'amount': this.editIngredient.amount
          });
        } else {
          this.editMode = false;
        }
      }
    );
  }

  ngOnChanges() {

  }

  onSubmitItem(f: NgForm) {
    const value = f.value;
    if (this.editMode) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(
        {ingredient: new Ingredient(value.name, value.amount)}));
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(new Ingredient(value.name, value.amount)));
    }
    this.onClearButton();
  }

  onDeleteButton() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClearButton();
  }

  onClearButton() {
    this.slForm.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.store.dispatch(new ShoppingListActions.StopEdit());
    this.subscription.unsubscribe();
  }
}
