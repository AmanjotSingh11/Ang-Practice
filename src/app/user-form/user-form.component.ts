import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { userDataService } from '../services/user-data-service.service';
import { User } from '../user-interface';
import { ModalService } from '../services/modal-utility-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnChanges {


  @Input() userToEdit !: User | any;

  reqs: any;

  userForm: FormGroup


  constructor(private modalService: ModalService, private userDataService: userDataService, private fb: FormBuilder) {
    this.reqs = userDataService.userDataReqs
    this.userForm = this.createForm();
  }

  createForm(): FormGroup {
    const formGroup = new FormGroup({});
    this.reqs.forEach((el: any) => {
      formGroup.addControl(
        el.fetchName,
        new FormControl('', this.createValidators(el))
      )
    });
    return formGroup;
  }

  createValidators(el: any) {
    let vals: any = []
    el.validators?.forEach((val: string) => {
      if (val == 'required') {
        vals.push(Validators.required)
      }
      if (val.includes('_')) {
        const ValidatorName = val.split('_')[0]
        const ValidatorValue = parseInt(val.split('_')[1])

        switch (ValidatorName) {
          case 'minLength': vals.push(Validators.minLength(ValidatorValue)); break;
          case 'maxLength': vals.push(Validators.maxLength(ValidatorValue)); break;
          case 'min': vals.push(Validators.min(ValidatorValue)); break;
          case 'max': vals.push(Validators.max(ValidatorValue)); break;
        }
      }
    });
    return vals
  }


  ngOnChanges(): void {
    this.userToEdit = this.userDataService.userToEdit
    if (this.userToEdit && this.userDataService.getFormMode()) {
      this.editForm(this.userToEdit)
    }
  }

  editForm(userToEdit: any) {
    let editUser: any = {}
    for (let req of this.reqs) {
      editUser = { ...editUser, [req.fetchName]: userToEdit[req.fetchName] }
    }
    this.userForm.setValue(editUser)
  }

  onSubmit() {
    if (this.userDataService.getFormMode()) {
      this.userDataService.editUser(this.userForm.value)
    } else {
      this.userDataService.createUser(this.userForm.value)
    }
    this.userDataService.setFormMode(false)
    this.modalService.close()
  }

}
