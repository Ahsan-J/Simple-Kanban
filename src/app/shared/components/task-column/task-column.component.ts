import { Component, EventEmitter, Input, Output } from "@angular/core";
import { TaskCardComponent } from "../task-card/task-card.component";
import { Task } from "../../models/task.model";
import { CreateTaskPlaceholderComponent } from "../create-task-placeholder/create-task-placeholder.component";
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ColumnList } from "../../models/column-list.model";

@Component({
    selector: 'task-column',
    templateUrl: './task-column.component.html',
    styleUrls: ['./task-column.component.css'],
    imports: [DragDropModule, TaskCardComponent, CreateTaskPlaceholderComponent]
})
export class TaskColumnComponent {
    @Input("column") column!: ColumnList;
    @Input("connectedColumn") connectedTo: Array<string> = [];
    @Input('tasks') tasks: Array<Task> | null = [];
    @Output('onDrop') onDrop = new EventEmitter<Task>();
    @Output('onAddTask') onAddTask = new EventEmitter<string>();
    @Output('onDelete') onDelete = new EventEmitter<string>();

    drop(event: CdkDragDrop<Task[] | null>) {
        // this.applyListItemMove(event);
        this.onDrop.emit(event.item.data);
    }

    addNewTask() {
        this.onAddTask.emit(this.column.id);
    }

    delete() {
        this.onDelete.emit(this.column.id);
    }

    private applyListItemMove(event: CdkDragDrop<Task[] | null>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(
                event.container.data || [],
                event.previousIndex,
                event.currentIndex
            );
        } else {
            transferArrayItem(
                event.previousContainer.data || [],
                event.container.data || [],
                event.previousIndex,
                event.currentIndex
            );
        }
    }
}