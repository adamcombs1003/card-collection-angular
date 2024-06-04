import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { MaterialModule } from './material/material.module';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, MaterialModule, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'combs-cards';
  @ViewChild('appcontainer') appContainer!: ElementRef;

  constructor(
    private overlayContainer: OverlayContainer
  ) { }

  toggleTheme() {
    this.appContainer.nativeElement.classList.toggle('light-theme');
    this.appContainer.nativeElement.classList.toggle('dark-theme');
    this.overlayContainer.getContainerElement().classList.toggle('light-theme')
    this.overlayContainer.getContainerElement().classList.toggle('dark-theme');
  }

}
