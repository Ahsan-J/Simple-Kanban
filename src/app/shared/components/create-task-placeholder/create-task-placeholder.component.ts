import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'create-task-placeholder',
    templateUrl: './create-task-placeholder.component.html'
})
export class CreateTaskPlaceholderComponent {
    @Output() onAdd = new EventEmitter<void>();

    openModal() {
        this.onAdd.emit();
    }
}