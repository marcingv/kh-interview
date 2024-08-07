import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  templateUrl: './main-layout.component.html',
  imports: [
    RouterOutlet
  ],
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

}
