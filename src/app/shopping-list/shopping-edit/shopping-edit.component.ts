import {OnChanges, Input, Output, EventEmitter, ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnChanges {
  @ViewChild('nameInput') nameInputRef : ElementRef;
  @ViewChild('amountInput') amountInputRef : ElementRef;
  @Input() ingredient : Ingredient;

  constructor(private shopSvc: ShoppingListService) { }

  ngOnInit() {
    this.ingredient = new Ingredient('',0);
  }

  ngOnChanges() {
    console.log('onChange');
    this.nameInputRef.nativeElement.value = this.ingredient.name;
    this.amountInputRef.nativeElement.value =this.ingredient.amount;
  }

  onAddItem() {
    console.log('onAddButton')
    this.shopSvc.pushIngredients(new Ingredient(this.nameInputRef.nativeElement.value,  this.amountInputRef.nativeElement.value));
  }

  onClearButton() {
    this.nameInputRef.nativeElement.value ="";
    this.amountInputRef.nativeElement.value ="";
  }
}
