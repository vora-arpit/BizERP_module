import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../../core';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductEditComponent implements OnInit {

  @Input() public product: Product = new Product();
  @Input() public error: string = '';

  @Output() public submitted: EventEmitter<Product> = new EventEmitter();
  @Output() public canceled: EventEmitter<string> = new EventEmitter();
  @Output() public deleted: EventEmitter<string> = new EventEmitter();

  public angForm: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      name: [this.product?.name || '', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
      price: [this.product?.price || 0, [Validators.required, Validators.pattern('[0-9]*')]],
      quantity_in_stock: [this.product?.quantityInStock || 0, [Validators.required, Validators.pattern('[0-9]*')]]
    });
  }
  

  onSubmit() {
    if (this.angForm.invalid)
      return;
      console.log(this.angForm.value);
    this.submitted.next(this.angForm.value);
  }

  confirmDelete(){
    if(confirm("Are you sure to delete?")) {
      this.deleted.emit('');
    }
  }
}
