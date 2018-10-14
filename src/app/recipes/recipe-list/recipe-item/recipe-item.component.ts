import {EventEmitter, Output, Input, Component, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model'
import { RecipeService } from '../../recipe.service';

import {Router,ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: Recipe; //= new Recipe('tesa', 'test', 'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg');

  constructor(private recipeSvc: RecipeService,
      private router: Router,
      private route: ActivatedRoute) { 
  }

  onSelected() {
    console.log('recipe clicked');
   // this.recipeSvc.recipeSelected.emit(this.recipe);
    this.router.navigate(['/recipes/', this.recipe.name]);
  }
  ngOnInit() {}

   /* create(recipe: Recipe) {
      console.log(recipe)
      this.recipe = recipe;
    }*/
}
