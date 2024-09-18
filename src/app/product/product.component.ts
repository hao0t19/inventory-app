import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ProductsComponent } from '../products/products.component';
import { IProduct } from '../product.service';
import { ClarityModule } from '@clr/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'in-product',
  standalone: true,
  imports: [CommonModule, ProductsComponent, ClarityModule, ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent {
  productForm: FormGroup;
  @Input() product!: IProduct;

  deviceType = 'tablet';

  deviceTypes = [
    { name: 'Tablet', icon: 'tablet' },
    { name: 'Laptop', icon: 'computer' },
    { name: 'Phone', icon: 'mobile' },
    { name: 'Monitor', icon: 'display' }
  ];

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      basic: this.fb.group({
        name: ['' , Validators.required],
        description: [''],
        active: [false],
        features: this.fb.array([this.fb.control('')])
      }),
      expiration: this.fb.group({
        expirationDate: [null]
      })
    });
  }

  selectDevice(device: { name: string, icon: string }) {
    this.deviceType = device.icon;
  }

  get basicFeatures(): FormArray {
    return this.productForm.get('basic.features') as FormArray;
  }

  addFeature() {
    this.basicFeatures.push(this.fb.control(''));
  }

  
}
