import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../../../core';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerEditComponent implements OnInit {

  @Input() public customer: Customer = new Customer(); // Initialize customer property with a new instance of Customer
  @Input() public error: string = ''; // Assign an initial value to error property

  @Output() public submitted: EventEmitter<Customer> = new EventEmitter();
  @Output() public canceled: EventEmitter<string> = new EventEmitter();
  @Output() public deleted: EventEmitter<string> = new EventEmitter();

  public angForm: FormGroup = this.fb.group({}); // Initialize angForm property

  public states = [
    { name: 'Gujarat', code: 'GJ' },
    { name: 'Mahrastra', code: 'MH' },
    { name: 'Andhra Pradesh', code: 'AP' },
    { name: 'Rajasthan', code: 'RJ' },
    { name: 'Utarpradesh', code: 'UP' },
    { name: 'Panjab', code: 'PB' }
    // Other state objects...
  ];

  public genders = [
    { name: 'Male', code: 'M' },
    { name: 'Female', code: 'F' }
  ];

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      name: [this.customer?.name || '', [Validators.required]],//Validators.pattern('^[a-zA-Z]*$')
      state: [this.customer?.state || '', [Validators.required]],
      description: [this.customer?.description || ''],//[Validators.pattern('^[a-zA-Z0-9]*$')]
      gender: [this.customer?.gender || ''],
      phone: [this.customer?.phone || ''], //[Validators.pattern('[0-9]*')] // Corrected pattern validator
      email: [this.customer?.email || '',[Validators.email]],
      city: [this.customer?.city || ''],//Validators.pattern('^[a-zA-Z]*$')
      address: [this.customer?.address || ''],//,[Validators.pattern('^[a-zA-Z0-9]*$')]
      birthdate: [!this.customer?.id ? null : new Date(this.customer.birthdate)]
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
