import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ComposeMessageComponent} from './components/body/compose-message/compose-message.component';
import {DashboardComponent} from './components/body/dashboard/dashboard.component';
import {LoginComponent} from "./components/login/login.component";
import {ComposeDateComponent} from "./components/body/compose-date/compose-date.component";

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'home', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'newMessage', component: ComposeMessageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'newDate', component: ComposeDateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
