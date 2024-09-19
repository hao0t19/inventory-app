import { Component, ChangeDetectionStrategy, Input, EventEmitter , Output, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators , ValidatorFn , AbstractControl } from '@angular/forms';
import { ProductsComponent } from '../products/products.component';
import { IProduct } from '../product.service';
import { ClarityModule } from '@clr/angular';
import { CommonModule } from '@angular/common';
import { ClrWizard } from '@clr/angular';

function minDateValidation(date: Date): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
  const forbidden = new Date(control.value) < date;
  return forbidden ? {minDateValidation: {value: control.value}}
         : 
 null;
  };
  }

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
  @Output() finish = new EventEmitter;
  @ViewChild('productWizard' , {static:false}) productWizard!:ClrWizard;

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
        expirationDate: [null
          ,Validators.compose([Validators.required, minDateValidation(new Date())])
        ]
      })
    });
  }

  get expirationError() {
    const expirationControl = this.productForm.get('expiration.expirationDate');
  
    if (expirationControl?.hasError('required')) {
      return 'This Field is Required!';
    }
    if (expirationControl?.hasError('minDateValidation')) {
      return "Expiration should be after today's date";
    }
    return null;
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

  get isBasicInvalid(): boolean {
    return this.productForm.get('basic')?.invalid ?? false;
  }
  
  get isExpirationInvalid():boolean {
    return this.productForm.get('expiration')?.invalid ?? false;
  }

  handleClose(){
    this.finish.emit();
    this.close();
  }

  close() {
    // Reset the form
    if (this.productForm) {
      this.productForm.reset();
    }
    
    // Reset the device type
    this.deviceType = 'tablet';
    
    // Safely navigate to the first page of the wizard
    if (this.productWizard?.pageCollection?.pages.length) {
      this.productWizard.goTo(this.productWizard.pageCollection.pages.first.id);
    }
  
    // Reset the wizard
    this.productWizard?.reset();
  }

  handleFinish(){
    this.finish.emit({
      product: {
        type : this.deviceType,
        ...this.productForm.get('basic')?.value,
        ...this.productForm.get('expiration')?.value,
      }

    });
    this.close();
  }
  
  
}
