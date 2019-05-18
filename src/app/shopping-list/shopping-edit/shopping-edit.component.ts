import {OnChanges, Input, Output, EventEmitter, ElementRef, ViewChild, Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnChanges, OnDestroy {
  @Input() ingredient : Ingredient;
  @ViewChild("f") slForm: NgForm;
  subscription : Subscription;
  editMode = false;
  editItemIndex: number;
  editIngredient : Ingredient;


  constructor(private shopSvc: ShoppingListService) { }

  ngOnInit() {
    this.ingredient = new Ingredient('',0);
    this.subscription = this.shopSvc.startedEditing.subscribe(
      (index: number) => {
        this.editItemIndex = index;
        this.editMode = true;
        this.editIngredient = this.shopSvc.getIngredient(this.editItemIndex);
        console.log('subscribe edit')
        this.slForm.setValue({
          'name' : this.editIngredient.name,
          'amount': this.editIngredient.amount
        })
      }
    );
  }

  ngOnChanges() {
   
  }

  onSubmitItem(f: NgForm) {
    const value =  f.value;
    if (this.editMode) {
      this.shopSvc.updateIngredient(this.editItemIndex, new Ingredient(value.name, value.amount));
    } else {
      this.shopSvc.pushIngredients(new Ingredient(value.name,  value.amount));
    }
    this.onClearButton();
  }

  onDeleteButton() {
    this.shopSvc.deleteIngredient(this.editItemIndex);
    this.onClearButton();
  } 
  onClearButton() {
    this.slForm.reset();
    this.editMode = false;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
