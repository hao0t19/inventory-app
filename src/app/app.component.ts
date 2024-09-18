import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { ProductsComponent } from './products/products.component';
import { DeleteProductModalComponent } from './delete-product-modal/delete-product-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'in-root',
  standalone: true,
  imports: [RouterOutlet , ClarityModule , ProductsComponent , DeleteProductModalComponent , ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'inventory-app';
}
