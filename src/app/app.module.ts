import {BrowserModule} from '@angular/platform-browser';

import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {CalendarComponent} from './calendar/calendar.component';
import {MessageBoardComponent} from './message-board/message-board.component';
import {ProfileComponent} from './profile/profile.component';
import {AdminComponent} from './admin/admin.component';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {MainBodyComponent} from './main-body/main-body.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatSidenavModule,
  MatSliderModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
} from '@angular/material';
import {LayoutModule} from '@angular/cdk/layout';
import {AppRoutingModule} from './app-routing.module';
import {RegisterComponent} from './register/register.component';
import {MessageService} from "./message.service";
import {HttpClientModule} from "@angular/common/http";
import {ListComponent} from './list/list.component';
import { ComposeMessageComponent } from './compose-message/compose-message.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CalendarComponent,
    MessageBoardComponent,
    ProfileComponent,
    AdminComponent,
    FooterComponent,
    HeaderComponent,
    MainBodyComponent,
    RegisterComponent,
    ListComponent,
    ComposeMessageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    AppRoutingModule,
    MatBadgeModule,
    MatSliderModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,

  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
