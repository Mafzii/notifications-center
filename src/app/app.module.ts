import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsContainerComponent } from './components/notifications-container/notifications-container.component';
// import { InfiniteScrollModule } from "ngx-infinite-scroll";


@NgModule({
  declarations: [
    AppComponent,
    NotificationComponent,
    NotificationsContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    // InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
