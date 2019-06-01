import {Component, OnInit} from '@angular/core';
import {RecipeService} from '../recipe.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Store} from '@ngrx/store';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromRecipe from '../store/recipe.reducers';
import * as RecipeActions from '../store/recipe.actions';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeState: Observable<fromRecipe.State>;
  id: number;
  constructor(private recSvc: RecipeService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private store: Store<fromRecipe.FeatureState>) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (data: Params) => {
        this.id = +data['id'];
        this.recipeState = this.store.select('recipes');
      }
    );
  }

  onDeleteRecipe() {
    this.store.dispatch(new RecipeActions.DelRecipe(this.id));
    this.router.navigate(['/recipes']);

  }

  onAddToShoppingList() {
    this.store.select('recipes')
      .take(1)
      .subscribe(
        (recipeState: fromRecipe.State) => {
          console.log(recipeState.recipes[this.id]);
          this.store.dispatch(new ShoppingListActions.AddIngredients(recipeState.recipes[this.id].ingredients));
        }
      );
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.activatedRoute});
  }
}
