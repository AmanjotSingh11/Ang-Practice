import { AfterViewChecked, AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { User } from '../user-interface';
import { userDataService } from '../services/user-data-service.service';
import { ModalService } from '../services/modal-utility-service.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {


  reqUser !: User

  userData: any = [];

  userHeadArray: { 'fetchName': string, 'showName': string }[] = []

  constructor(private userDataService: userDataService, private modalService: ModalService) {
  }

  ngOnInit(): void {
    this.userDataService.getUsers()
    this.userDataService.userData$.subscribe(data => this.userData = data)
    this.userHeadArray = this.userDataService.userDataReqs
  }

  launchEditModal(user: any) {
    this.modalService.open()
    this.userDataService.shareUser(user)
    this.userDataService.setFormMode(true)
  }

  launchCreateUserModal() {
    this.modalService.open();
  }

  deleteUser(user:User){
    this.userDataService.deleteUser(user)
  }

}
