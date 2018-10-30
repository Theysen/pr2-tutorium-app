import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/body/dashboard/dashboard.component';
import { ValidateSlotComponent } from './components/body/validate-slot/validate-slot.component';
import { LoginComponent } from './components/body/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { SlotoverviewComponent } from './components/body/dashboard/slotoverview/slotoverview.component';
import { AdminViewComponent } from './components/body/dashboard/admin-view/admin-view.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'home', redirectTo: '', pathMatch: 'full'},
  {path: 'dashboard', redirectTo: '', pathMatch: 'full'},
  // {path: 'newMessage', component: ComposeMessageComponent},
  // {path: 'newDate', component: ComposeDateComponent},
  {
    path: 'adminview',
    component: AdminViewComponent,
    canActivate: [AuthGuard]
  },
  {path: 'checkID', component: ValidateSlotComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
