import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ComposeMessageComponent} from './compose-message/compose-message.component';
import {DashboardComponent} from './dashboard/dashboard.component';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'home', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'newMessage', component: ComposeMessageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
