import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromRecipe from '../store/recipe.reducers';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Observable<fromRecipe.State>;

  constructor(private store: Store<fromRecipe.FeatureState>,
              private activedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.recipes = this.store.select('recipes');
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.activedRoute});
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
