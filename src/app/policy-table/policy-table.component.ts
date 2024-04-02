import { Component } from '@angular/core';
import { PolicyDataServiceService } from '../services/policy-data-service.service';

@Component({
  selector: 'app-policy-table',
  templateUrl: './policy-table.component.html',
  styleUrls: ['./policy-table.component.css']
})
export class PolicyTableComponent {

  policyData : any;
  calculatedPolicyData : any;
  policyReqs : any;

  constructor(policyDataService : PolicyDataServiceService){
    this.policyReqs = policyDataService.reqProperties;
    this.calculatedPolicyData = policyDataService.getCalculatedData()
  }


}
