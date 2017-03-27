import { Observable } from 'rxjs/Rx';
import { Component, OnInit, Inject } from '@angular/core';

import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { State, process, SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { DialogService, DialogRef, DialogCloseResult } from '@progress/kendo-angular-dialog';

import { Product } from './user-model';
import { EditService } from '../services/users-crud.service';

@Component({
    selector: 'users-table',
    templateUrl: './list.view.html',
    providers: [DialogService]
})
export class ListComponent implements OnInit {
    public view: Observable<GridDataResult>;
    public gridState: State = {
        sort: [],
        skip: 0,
        take: 10
    };

    private editService: EditService;
    private editDataItem: Product;
    private isNew: boolean;

    constructor( @Inject(EditService) editServiceFactory: any, private dialogService: DialogService) {
        this.editService = editServiceFactory();
    }

    public ngOnInit(): void {
        this.view = this.editService.map(data => {

            return <GridDataResult>{
                data: data.content ? data.content : [],
                total: data.totalElements
            };

        });

        this.editService.read(this.gridState);
    }

    public readData() {

        this.editService.read(this.gridState);
    }


    public onStateChange(state: State) {
        this.gridState = state;

        this.editService.read(this.gridState);
    }

    public addHandler() {
        this.editDataItem = new Product();
        this.isNew = true;
    }

    public editHandler({ dataItem }) {
        this.editDataItem = dataItem;
        this.isNew = false;
    }

    public cancelHandler() {
        this.editDataItem = undefined;
    }

    public saveHandler(product: Product) {
        this.editService.save(product, this.isNew, this.gridState);

        this.editDataItem = undefined;
    }

    public removeHandler({ dataItem }) {

        const dialog: DialogRef = this.dialogService.open({
            title: "Please confirm",
            content: "Are you sure?",
            actions: [
                { text: "No" },
                { text: "Yes", primary: true }
            ]
        });

        dialog.result.subscribe((answer: any) => {
            if (answer.text == 'Yes') {
                this.editService.remove(dataItem, this.gridState);
            }
        });
    }
}
