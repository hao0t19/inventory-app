import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { ProductsComponent } from './products/products.component';
import { DeleteProductModalComponent } from './delete-product-modal/delete-product-modal.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@Component({
  selector: 'in-root',
  standalone: true,
  imports: [RouterOutlet , ClarityModule , ProductsComponent , DeleteProductModalComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'inventory-app';
}
