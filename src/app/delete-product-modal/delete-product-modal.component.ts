import { Component , OnInit , Input , Output , EventEmitter} from '@angular/core';
import { ProductsComponent } from '../products/products.component';
import { IProduct } from '../product.service';
import { ClarityModule } from '@clr/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'in-delete-product-modal',
  standalone: true,
  imports: [ProductsComponent , ClarityModule , CommonModule ],
  templateUrl: './delete-product-modal.component.html',
  styleUrl: './delete-product-modal.component.scss',
})
export class DeleteProductModalComponent implements OnInit{
  @Input() product!:IProduct;
  @Output() cancel = new EventEmitter();
  @Output() confirm = new EventEmitter();

  constructor(){}

  ngOnInit(): void {
      
  }

  cancelDelete(){
    this.cancel.emit();
  }

  confirmDelete(){
    this.confirm.emit();
  }
}
