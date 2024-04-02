import { Component, ElementRef, Input, OnInit, TemplateRef } from '@angular/core';
import { ModalService } from '../services/modal-utility-service.service';
import { User } from '../user-interface';
import { userDataService } from '../services/user-data-service.service';

@Component({
  selector: 'app-modal',
  templateUrl: './user-form-modal.component.html',
  styleUrls: ['./user-form-modal.component.css']
})
export class UserFormModalComponent implements OnInit {
  isOpen !: boolean;

  @Input() user !: User;

  constructor(private modalService: ModalService , private userDataService : userDataService) {}

  ngOnInit() {
    this.modalService.watch().subscribe((isOpen: boolean) => {
      this.isOpen = isOpen;
    });
  }

  close() {
    this.modalService.close();
    this.userDataService.setFormMode(false)
  }
}
