import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Store} from '@ngrx/store';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../../shopping-list/store/shopping-list.reducers';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recSvc: RecipeService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private store: Store<fromShoppingList.AppState>) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (data: Params) => {
        this.id = +data['id'];
        this.recipe = this.recSvc.getRecipe(this.id);
      }
    );
  }

  onDeleteRecipe() {
    this.recSvc.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);

  }

  onAddToShoppingList() {
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.activatedRoute});
  }
}
