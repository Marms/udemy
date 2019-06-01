import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Recipe} from '../recipe.model';
import {FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import {Ingredient} from '../../shared/ingredient.model';
import * as RecipeAction from '../store/recipe.actions';
import * as fromRecipe from '../store/recipe.reducers';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode: boolean;
  form: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router,
              private store: Store<fromRecipe.FeatureState>) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  initForm() {

    if (this.editMode) {
      return this.store.select('recipes').take(1)
        .subscribe((state: fromRecipe.State) => {
          const recipe: Recipe = state.recipes[this.id];
          this.setForms(recipe);
          console.log(this.form.value);
        });
    } else {
      this.setForms(new Recipe('', '', '', [new Ingredient('', null)]));
    }
  }

  private setForms(recipe: Recipe) {
    this.form = new FormGroup({
      'name': new FormControl(recipe.name, Validators.required),
      'imagePath': new FormControl(recipe.imagePath, Validators.required),
      'description': new FormControl(recipe.description, Validators.required),
      'ingredients': this.getIngredients(recipe)
    });
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onSubmit() {
    if (this.editMode) {
      const updatedRecipe: Recipe = this.form.value;
      this.store.dispatch(new RecipeAction.MajRecipe({index: this.id, updatedRecipe: updatedRecipe}));
    } else {
      this.store.dispatch(new RecipeAction.AddRecipe(this.form.value));
    }
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  addIngredient() {
    (<FormArray>this.form.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]*/)])
      })
    );
  }

  deleteIngredient(i: number) {
    (<FormArray>this.form.get('ingredients')).removeAt(i);
  }

  getIngredients(recipe: Recipe): FormArray {
    const formArray = new FormArray([]);
    for (const ingredients of recipe.ingredients) {
      formArray.push(new FormGroup({
        'name': new FormControl(ingredients.name, [Validators.required]),
        'amount': new FormControl(ingredients.amount, [Validators.required, Validators.pattern(/^[0-9]/)])
      }));
    }
    return formArray;
  }

  getControls() {
    return (<FormArray>this.form.get('ingredients')).controls;
  }

}
