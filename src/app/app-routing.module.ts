import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './components/body/dashboard/dashboard.component';
import {ValidateSlotComponent} from "./components/body/validate-slot/validate-slot.component";

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'home', redirectTo: '', pathMatch: 'full'},
  {path: 'dashboard', redirectTo: '', pathMatch: 'full'},
  // {path: 'newMessage', component: ComposeMessageComponent},
  // {path: 'login', component: LoginComponent},
  // {path: 'newDate', component: ComposeDateComponent},
  {path: 'idPruefen', component: ValidateSlotComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
