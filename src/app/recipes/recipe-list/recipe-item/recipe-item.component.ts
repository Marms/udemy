import {EventEmitter, Output, Input, Component, OnInit} from '@angular/core';
import {Recipe} from '../../recipe.model';
import {RecipeService} from '../../recipe.service';

import {Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: Recipe;
  @Input() index: number;

  constructor(private recipeSvc: RecipeService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  /* create(recipe: Recipe) {
     console.log(recipe)
     this.recipe = recipe;
   }*/
}
