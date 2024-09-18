import { Component , OnInit , ChangeDetectionStrategy } from '@angular/core';
import { IProduct, ProductsService } from '../product.service';
import { Observable } from 'rxjs';
import { ClarityModule } from '@clr/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'in-products',
  standalone: true,
  imports: [ClarityModule , CommonModule],
  providers:[ProductsService],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent {
  products$:Observable<IProduct[]>;

  constructor(private productsService : ProductsService){
    this.products$ = this.productsService.products$;
  }

  trackById(index: number, item: IProduct): any {
    return item.id;
  }
}
