import { Ingredient } from "../shared/ingredient.model";
import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs/Subject";


export class ShoppingListService {
    ingredientsChanged = new Subject <Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)];
    
    getIngredients() {
        return this.ingredients.slice();
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
}