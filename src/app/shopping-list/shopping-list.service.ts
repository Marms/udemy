import { Ingredient } from "../shared/ingredient.model";
import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs/Subject";


export class ShoppingListService {
    ingredientsChanged = new Subject <Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)];
    
    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    pushIngredients(ing : Ingredient) {
        this.ingredients.push(ing);
        this.ingredientsChanged.next(this.ingredients);
    }

    pushAllIngredients(ings : Ingredient[]) {
        console.log('pushall');
        this.ingredients.push(...ings);
        this.ingredientsChanged.next(this.ingredients);
    }

    updateIngredient(index: number, newIngredient : Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}