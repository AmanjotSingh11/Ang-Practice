import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PolicyDataServiceService {

  policyData = [
    {
      "id": 101,
      "policyName": "xyz",
      "salary": 500000,
      "claimedAmount": 50000,
      "numberOfDependents": 3,

    },
    {
      "id": 102,
      "policyName": "pqr",
      "salary": 2500,
      "claimedAmount": 500,
      "numberOfDependents": 0,

    },
    {
      "id": 103,
      "policyName": "John Doe",
      "salary": 2500000,
      "claimedAmount": 45000,
      "numberOfDependents": 2,

    },
  ]

  reqProperties = [
    {'fetchName' : 'id' , 'showName':'User Id'},
    {'fetchName' : 'numberOfDependents' , 'showName':'Number Of Deps'},
    {'fetchName' : 'policyName' , 'showName':'Policy Name'},
    {'fetchName' : 'claimedAmount' , 'showName':'Claimed Amount'},
    {'fetchName' : 'salary' , 'showName':'Salary'},
    
  ]

  constructor() { }

  getPolicyData(){
    return this.policyData;
  }

  getUserPolicyData(id : number){
    return this.policyData.filter((pd)=>pd.id !== id)[0];
  }

  getCalculatedData(){
    return this.policyData.map((pd)=>{
      return pd.salary < 500000 
        ? {...pd , 'pma': 1000000 , 'bl' : 1000000 - pd.claimedAmount  } 
        : {...pd , 'pma': pd.salary * 2.5 , 'bl' : pd.salary * 2.5 - pd.claimedAmount  }
    })
  }

}
