import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorkListComponent } from './portfolio/work-list/work-list.component';
import { WorkDetailComponent } from './portfolio/work-detail/work-detail.component';
import { FormsModule } from '@angular/forms';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { HeaderComponent } from './header/header.component';
import { WorkAddComponent } from './portfolio/work-add/work-add.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastNoAnimationModule} from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    PortfolioComponent,
    WorkListComponent,
    WorkDetailComponent,
    HeaderComponent,
    WorkAddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ToastNoAnimationModule.forRoot({timeOut: 10000,
      positionClass: 'toast-bottom-right',
     maxOpened:1
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
