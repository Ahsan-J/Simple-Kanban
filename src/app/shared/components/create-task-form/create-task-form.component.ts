import { Component, inject, ViewChild } from "@angular/core";
import { ModalComponent } from "../modal/modal.component";
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { ComboboxComponent } from "../combobox/combobox.component";
import { TaskService } from "../../../core/service/task.service";
import { Task } from "../../models/task.model";
import { ColumnListService } from "../../../core/service/list.service";
import { AsyncPipe } from "@angular/common";

type FormContext = {
    title: string;
    description: string;
    tags: Array<string>;
    columnId: string;
    dueAt: Date;
}

@Component({
    selector: 'create-task-form-modal',
    templateUrl: './create-task-form.component.html',
    imports: [ModalComponent, ReactiveFormsModule, ComboboxComponent, AsyncPipe],
})
export class CreateTaskFormComponent {
    @ViewChild(ModalComponent) modal!: ModalComponent;

    private formBuilder: FormBuilder = inject(FormBuilder);
    private taskService: TaskService = inject(TaskService);
    columnList$ = inject(ColumnListService).getObservable();

    createTaskForm = this.formBuilder.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        dueAt: [],
        tags: this.formBuilder.array<string>([]),
        columnId: ['', Validators.required]
    })

    get tags(): FormArray {
        return this.createTaskForm.get('tags') as FormArray;
    }

    get tagValues(): Array<string> {
        return this.tags.value?.filter((v: string) => !!v)
    }

    addTask() {
        if (this.createTaskForm.invalid) {
            this.createTaskForm.markAllAsTouched();
            return;
        }
        
        const task = new Task(this.createTaskForm.value);
        this.taskService.addTask(task)
        this.createTaskForm.reset();
    }

    addTag(tag: string) {
        this.tags.push(new FormControl(tag));
    }

    removeTag(index: number) {
        this.tags.removeAt(index);
    }

    private setContextValueInForm(context?: Partial<FormContext>) {
        if(context?.title) this.createTaskForm.controls['title'].setValue(context.title);
        if(context?.columnId) this.createTaskForm.controls['columnId'].setValue(context.columnId);
        if(context?.description) this.createTaskForm.controls['description'].setValue(context.description);
        if(context?.tags) this.createTaskForm.controls['tags'].setValue(context.tags);
        // if(context?.dueAt) this.createTaskForm.controls['dueAt'].setValue(context.dueAt);
    }

    public openAddTaskModal(context?: Partial<FormContext>) {
        this.setContextValueInForm(context);
        this.modal.open()
    }

    public closeAddTaskModal() {
        this.modal.close()
    }
}