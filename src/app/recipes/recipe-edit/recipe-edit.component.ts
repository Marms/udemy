import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { FormGroup, FormControlName, FormControl, FormArray, Validators } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode: boolean;
  form: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private recipeSvc: RecipeService) {  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }
  initForm() {
    const recipe : Recipe = this.getRecipe();

    this.form = new FormGroup({
      'name': new FormControl(recipe.name, Validators.required),
      'imagePath': new FormControl(recipe.imagePath, Validators.required),
      'description': new FormControl(recipe.description, Validators.required),
      'ingredients': this.getIngredients(recipe)
    });
  }

  onCancel() {
    this.router.navigate(["../"], {relativeTo : this.route})
  }
  onSubmit() {
    if (this.editMode) {
      this.recipeSvc.updateRecipe(this.id, this.form.value);
    } else {
      this.recipeSvc.addRecipe(this.form.value)
    }
    this.router.navigate(['..'], {relativeTo: this.route})
  }

  addIngredient() {
    (<FormArray> this.form.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null,[Validators.required, Validators.pattern(/^[0-9]*/)] )
      })
    )
  }
  deleteIngredient(i: number) {
    (<FormArray>this.form.get('ingredients')).removeAt(i);
  }
  getRecipe() : Recipe {
    if (this.editMode) {
    return this.recipeSvc.getRecipe(this.id);
    }
    return new Recipe('','','', [new Ingredient('',null)]);
  }

  getIngredients(recipe: Recipe) : FormArray{
    let formArray = new FormArray([]);
    for (let ingredients of recipe.ingredients) {
      formArray.push(new FormGroup({
        'name': new FormControl(ingredients.name, [Validators.required]),
        'amount': new FormControl(ingredients.amount, [Validators.required, Validators.pattern(/^[0-9]/)])
      }))
    }
    return formArray;
  }
}
