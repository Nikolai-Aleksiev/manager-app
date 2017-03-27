import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Product } from '../list/user-model';

@Component({
    selector: 'kendo-grid-edit-form',
    styles: [
      "input { width: 100%; }"
    ],
    templateUrl: './edit.view.html',
})
export class GridEditFormComponent {
    private editForm = new FormGroup({
        'id': new FormControl(),
        'firstName': new FormControl("", Validators.required),
        'lastName': new FormControl("", Validators.required),
        'email': new FormControl("", Validators.required),
        'dateOfBirth': new FormControl("", Validators.required)
    });

    private active: boolean = false;
    @Input() public isNew: boolean = false;

    @Input() public set model(product: Product) {
        this.editForm.reset(product);

        this.active = product !== undefined;
    }

    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Output() save: EventEmitter<Product> = new EventEmitter();

    public onSave(e): void {
        e.preventDefault();
        this.save.emit(this.editForm.value);
        this.active = false;
    }

    public onCancel(e): void {
        e.preventDefault();
        this.closeForm();
    }

    private closeForm(): void {
        this.active = false;
        this.cancel.emit();
    }
}
