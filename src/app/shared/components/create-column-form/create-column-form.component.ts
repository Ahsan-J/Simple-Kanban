import { Component, inject, ViewChild } from "@angular/core";
import { ModalComponent } from "../modal/modal.component";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ColumnListService } from "../../../core/service/list.service";
import { ColumnList } from "../../models/column-list.model";

@Component({
    selector: 'create-column-form-modal',
    standalone: true,
    templateUrl: './create-column-form.component.html',
    imports: [ModalComponent, ReactiveFormsModule],
})
export class CreateColumnFormComponent {
    @ViewChild(ModalComponent) modal!: ModalComponent;

    private fb = inject(FormBuilder);
    private columnService = inject(ColumnListService);

    columnForm = this.fb.group({
        title: ['', [Validators.required, Validators.minLength(2)]]
    });

    open() {
        this.columnForm.reset();
        this.modal.open();
    }

    close() {
        this.modal.close();
    }

    addColumn() {
        if (this.columnForm.invalid) {
            this.columnForm.markAllAsTouched();
            return;
        }

        const title = this.columnForm.value.title as string;
        const newColumn = new ColumnList({ title });
        this.columnService.addList(newColumn);
        this.close();
    }
}
