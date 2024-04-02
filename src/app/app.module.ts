import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserTableComponent } from './user-table/user-table.component';
import { UserFormModalComponent } from './user-form-modal/user-form-modal.component';
import { UserFormComponent } from './user-form/user-form.component';
import { userDataService } from './services/user-data-service.service';
import { ModalService } from './services/modal-utility-service.service';
import { PolicyTableComponent } from './policy-table/policy-table.component';
import { RouterModule, Routes } from '@angular/router';
import { ChartsComponent } from './charts/charts.component';
import { NgChartsModule } from 'ng2-charts';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { PieCHartComponent } from './charts/pie-chart/pie-chart.component';

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UserTableComponent },
  { path: 'policies', component: PolicyTableComponent },
  { path: 'charts', component: ChartsComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    UserTableComponent,
    UserFormModalComponent,
    UserFormComponent,
    PolicyTableComponent,
    ChartsComponent,
    LineChartComponent,
    BarChartComponent,
    PieCHartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes),
    NgChartsModule
  ],
  providers: [
    userDataService,
    ModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
