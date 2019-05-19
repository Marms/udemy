import { Component} from '@angular/core';
import {DataStorageService} from '../../shared/data-storage.service';
import {Response} from '@angular/http';
import {AuthService} from '../../auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ['']

})
export class HeaderComponent {
//  @Output() featureSelected = new EventEmitter<string> ();

  // onSelect(feature: string) {
  // this.featureSelected.emit(feature );
  //}

  constructor(private dataSvc: DataStorageService,
              private authSvc: AuthService) {
  }

  onSaveData() {
    this.dataSvc.saveRecipes().subscribe((response: Response) => {
      console.log(response);
    });
  }

  onFetchData() {
    this.dataSvc.getRecipes();
  }

  onLogOut() {
    this.authSvc.logOut();
  }
}
