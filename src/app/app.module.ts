import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import ruLocale from '@angular/common/locales/ru';
import { NgxMaskModule, IConfig } from 'ngx-mask';

import {AppComponent} from './app.component';
import {TableComponent} from './table/table.component';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {PostComponent} from './post/post.component';
import {AppRoutingModule} from './app-routing.module';
import {HomePageComponent} from './home-page/home-page.component';
import {CreatePageComponent} from './create-page/create-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { PaginatorComponent } from './shared/components/paginator/paginator.component';

registerLocaleData(ruLocale, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    MainLayoutComponent,
    PostComponent,
    HomePageComponent,
    CreatePageComponent,
    PaginatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot()
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'ru' }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
