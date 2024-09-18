import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { ProductsComponent } from './products/products.component';

@Component({
  selector: 'in-root',
  standalone: true,
  imports: [RouterOutlet , ClarityModule , ProductsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'inventory-app';
}
