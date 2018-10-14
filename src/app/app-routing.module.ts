import { Route } from "@angular/router";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes/recipes.component";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";

const routes : Routes = [
    {path: "recipes", component: RecipesComponent},
    {path: "recipes/:name", component: RecipeDetailComponent},
    
    {path: "shopping-list", component: ShoppingListComponent},
    {path: '**', redirectTo: '/recipes'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
      ],    
    exports: [RouterModule]
})
export class AppRoutingModule {



}