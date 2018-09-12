import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainBodyComponent} from "./main-body/main-body.component";
import {CalendarComponent} from "./calendar/calendar.component";
import {RegisterComponent} from "./register/register.component";
import {ListComponent} from "./list/list.component";
import {ComposeMessageComponent} from './compose-message/compose-message.component';
import {DashboardComponent} from './dashboard/dashboard.component';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'home', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: MainBodyComponent},
  {path: 'calendar', component: CalendarComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'list', component: ListComponent},
  {path: 'new', component: ComposeMessageComponent},
  {path: 'd', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
