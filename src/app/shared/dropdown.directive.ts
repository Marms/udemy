import {Renderer2, TemplateRef, ViewContainerRef, Input, ElementRef, HostListener, HostBinding, Directive } from '@angular/core';



@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  // ecouter l'evenement click est modifier une properties css pour afficher la liste

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }
  @HostBinding('class.open') isOpen : boolean = false;
  
  
  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }

}
