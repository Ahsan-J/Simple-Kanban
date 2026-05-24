import { Component, ViewChild } from "@angular/core";
import { CreateTaskFormComponent } from "../create-task-form/create-task-form.component";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    imports: [CreateTaskFormComponent]
})
export class HeaderComponent {
    @ViewChild(CreateTaskFormComponent) createTaskModal!: CreateTaskFormComponent;

    openModal() {
        this.createTaskModal.openAddTaskModal()
    }
}