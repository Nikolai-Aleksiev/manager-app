import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, Jsonp, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';


import { DialogModule } from '@progress/kendo-angular-dialog';
import { GridModule } from '@progress/kendo-angular-grid';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';

import { GridEditFormComponent } from './users/edit/edit.component';
import { ListComponent } from './users/list/list.component';
import { EditService } from './users/services/users-crud.service';

export function createFactory(http: Http) { return function() { return new EditService(http); }};
export function createDialog() { return DialogModule.forRoot(); }

@NgModule({
  declarations: [
    GridEditFormComponent,
    ListComponent,
    AppComponent
  ],
  imports: [
    JsonpModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    GridModule,
    DialogModule,
    DateInputsModule,

  ],
  providers: [
    {
      deps: [Http],
      provide: EditService,
      useFactory: createFactory
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }


