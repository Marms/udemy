import { Recipe } from "./recipe.model";
import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

/** Manage recipe */
@Injectable()
export class RecipeService {

   //  recipeSelected = new EventEmitter<Recipe>();
    private recipes: Recipe[] = [new Recipe('Test Recipe', 'Test Description',
        'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg',
        [new Ingredient('thon',1), new Ingredient('creme fraiche', 1)]
    ),
       new Recipe('Test Recipe', 'Test Description',
        'https://www.magasins-u.com/images/20170228_maison_recetteburger_740x510-burger',
        [new Ingredient('boeuf',1), new Ingredient('sauce tomate', 1)]
    )];

    constructor(private shopSvc: ShoppingListService) {}

    getRecipes() {
        return this.recipes.slice(); // retourne une copie du tableau
    }

    getRecipe(name: string): Recipe {
        var i: Recipe = this.recipes.filter (function(item: Recipe) {
            return item.name === name;
        })[0];
        return i;
    }
    addToShoppingList(ings : Ingredient[]) {
        this.shopSvc.pushAllIngredients(ings);
    }


}