import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainBodyComponent} from "./main-body/main-body.component";
import {CalendarComponent} from "./calendar/calendar.component";

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'home', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: MainBodyComponent},
  {path: 'calendar', component: CalendarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
