import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable, SubscriptionLike, filter, map, tap } from 'rxjs';
import { User } from '../user-interface'

@Injectable({
  providedIn: 'root'
})
export class userDataService {

  private readonly apiurl = 'https://hub.dummyapis.com/employee?noofRecords=10&idStarts=101';

  userDataReqs = [
    { 
      'fetchName': 'firstName', 
      'showName': 'First Name', 
      'validators': ['required' , 'maxLength_25'] , 
      'errors' : ['Field is Required' , 'Max permitted length of first name is 25'] 
    },
    { 
      'fetchName': 'lastName', 
      'showName': 'Last Name' , 
      'validators': ['required' , 'maxLength_25'],
      'errors' : ['Field is Required' , 'Max permitted length of last name is 25']
    },
/*  { 
      'fetchName': 'address', 
      'showName': 'Address' ,
      'validators' : []
      'errors' : []
    }, 
*/
    { 
      'fetchName': 'contactNumber', 
      'showName': 'Contact' , 
      'validators': ['required'],
      'errors' : ['Field is Required']
    },
/*  { 
      'fetchName': 'mail', 
      'showName': 'Mail',
      'validators' : []
      'errors' : []
    }, 
*/
    { 
      'fetchName': 'age', 
      'showName': 'Age' , 
      'validators': ['required' , 'min_16' , 'max_75'],
      'errors' : ['Field is Required' , 'Must be older than 16' , 'Must be younger than 75']
    },
    { 
      'fetchName': 'dob', 
      'showName': 'Date of Birth',
      'validators' : [],
      'errors' : []
    },
  ]


  private userDataSubject = new BehaviorSubject<User[]>([]);
  userData$ = this.userDataSubject.asObservable();

  userToEdit !: User;
  isFormEditMode !: boolean;

  constructor(private http: HttpClient) { }


  getUsers(): void {
    this.http.get<User[]>(this.apiurl).subscribe(users => {
      this.userDataSubject.next(users);
    });
  }

  getUser(firstName: string) {
    return this.userData$.pipe(
      map(users => users.find(user => user.firstName === firstName))
    );
  }


  editUser(user: User) {
    this.http.put(this.apiurl, user)
    console.log('edited')
    this.userData$.pipe(
      tap(users => {
        const index = users.findIndex(u => u.dob === user.dob);
        if (index !== -1) {
          users[index] = { ...user };  
        }
      }),
      map(users => [...users])  
    ).subscribe();
  }


  deleteUser(user:User){
    this.userData$.pipe(
      tap(users => {
        const index = users.findIndex(u => u.dob === user.dob);
        if (index !== -1) {
          users = users.splice(index , 1)
        }
      }),
      map(users => [...users])  
    ).subscribe();
  }

  createUser(user: User) {
    this.http.post(this.apiurl, user)
    alert(JSON.stringify(user))

    this.userData$.pipe(
      tap(users => {
          users.push(user)
      }),
      map(users => [...users])  
    ).subscribe(); 
  }

  shareUser(user: User) {
    this.userToEdit = user;
  }

  getFormMode() {
    return this.isFormEditMode;
  }

  setFormMode(value: boolean) {
    this.isFormEditMode = value;
  }
}
