import { Component , OnInit , ChangeDetectionStrategy } from '@angular/core';
import { IProduct, ProductsService } from '../product.service';
import { Observable } from 'rxjs';
import { ClarityModule } from '@clr/angular';
import { CommonModule } from '@angular/common';
import { DeleteProductModalComponent } from '../delete-product-modal/delete-product-modal.component';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'in-products',
  standalone: true,
  imports: [ClarityModule , CommonModule , DeleteProductModalComponent , ProductComponent],
  providers:[ProductsService],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit {
  delete = false;
  productToBeDeleted!: IProduct;
  products$:Observable<IProduct[]>;
  selectedProduct: IProduct | undefined;
  productOpen: boolean = false;
  
  addProduct() {
    this.productOpen = true;
    this.selectedProduct = undefined;  
  }
  
  //dependency injection
  constructor(private productsService : ProductsService){
    //observable assignment
    this.products$ = this.productsService.products$;
  }


  ngOnInit() {
  }

  onEdit(product : IProduct){
    this.productOpen = true;
    this.selectedProduct = product;
    console.log('open edit')
  }


  onDelete(product: IProduct) {
    this.delete = true;
    this.productToBeDeleted = product;
    console.log(this.productToBeDeleted )
  }

  handleCancel() {
    this.delete = false;
  }

  handleFinish(event : { product: IProduct }){
    if(event && event.product){
      if(this.selectedProduct){
        //Edit Flow
        this.productsService.editProduct(this.selectedProduct.id,event.product);
      } else {
        //Save New
        this.productsService.addProduct(event.product);
      }
    }
    console.log('handlefinish in products')
    this.productOpen = false;
  }

  confirmDelete() {
    this.handleCancel();
    // We need to implement this method removeProduct in our ProductsService
    if (this.productToBeDeleted) { // Check if productToBeDeleted is defined
      this.productsService.removeProduct(this.productToBeDeleted);
    }
  }

  trackById(index: number, item: IProduct): any {
    return item.id;
  }

}
