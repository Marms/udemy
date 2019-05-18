import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipeService } from './recipes/recipe.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import {HttpModule} from '@angular/http';
import {DataStorageService} from './shared/data-storage.service';
import {AuthService} from './auth/auth.service';
import {AuthGuard} from './auth/auth-guard';
import {RecipesModule} from './recipes/recipes.module';
import {SharedModule} from './shared/shared.module';
import {ShoppingModule} from './shopping-list/shopping.module';
import {AuthModule} from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RecipesModule,
    ShoppingModule,
    AuthModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [ShoppingListService, RecipeService, DataStorageService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
