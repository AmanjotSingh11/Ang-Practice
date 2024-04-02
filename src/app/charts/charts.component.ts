import { Component } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent {

  lineChartData = {
    labels: ['Sun', 'Mon', 'Tue'],
    datasets: [
      {
        data: [10, 20, 15, 25, 18, 30],
        label: 'Series A',
        fill: true,
      },
      {
        data: [5, 15, 10, 20, 15, 25],
        label: 'Series B',
        fill: true
      },
      {
        data: [18, 18, 18],
        label: 'Target Referance',
        borderColor: 'rgba(44 , 44 , 44 , 0.5)'
      }
    ]
  }

  pieChartData = {
    labels: ['Sunday', 'Monday', 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday'],
    datasets: [
      {
        data: [2, 7, 6 ,5 , 5 , 4 , 3],
        label: 'sales',
      },
    ]
  }

  barChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      { 
        data: [30, 40, 35, 45, 38, 50], 
        label: 'Series A' 
      },
      { 
        data: [15, 25, 20, 30, 25, 35], 
        label: 'Series B' 
      }
    ]
  }
}
