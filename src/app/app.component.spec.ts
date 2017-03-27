import { TestBed, async } from '@angular/core/testing';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, Jsonp, JsonpModule } from '@angular/http';

import { GridModule, GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { State, process, SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { DialogModule, DialogService, DialogRef, DialogCloseResult } from '@progress/kendo-angular-dialog';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';

import { AppComponent } from './app.component';
import { ListComponent } from './users/list/list.component';
import { GridEditFormComponent } from './users/edit/edit.component';
import { EditService } from './users/services/users-crud.service';


export function createFactory(http: Http) { return function() { return new EditService(http); }};

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [JsonpModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        GridModule,
        DialogModule,
        DateInputsModule
      ],
      declarations: [
        AppComponent,
        ListComponent,
        GridEditFormComponent
      ],
      providers: [
        {
          deps: [Http],
          provide: EditService,
          useFactory: createFactory
        }
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Angular 2 Demo'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Angular 2 Demo');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Angular 2 Demo');
  }));
});
