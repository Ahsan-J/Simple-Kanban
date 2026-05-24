import { Component, inject, OnInit, ViewChild } from "@angular/core";
import { TaskColumnComponent } from "../../shared/components/task-column/task-column.component";
import { CreateTaskFormComponent } from "../../shared/components/create-task-form/create-task-form.component";
import { CreateColumnFormComponent } from "../../shared/components/create-column-form/create-column-form.component";
import { TaskService } from "../../core/service/task.service";
import { Task } from "../../shared/models/task.model";
import { ColumnListService } from "../../core/service/list.service";
import { ColumnList } from "../../shared/models/column-list.model";

@Component({
    selector: 'task-board',
    templateUrl: './board.component.html',
    imports: [TaskColumnComponent, CreateTaskFormComponent, CreateColumnFormComponent],
})
export class BoardComponent implements OnInit {
    @ViewChild(CreateTaskFormComponent) createTaskModal!: CreateTaskFormComponent;
    @ViewChild(CreateColumnFormComponent) createColumnModal!: CreateColumnFormComponent;

    private taskService: TaskService = inject(TaskService);
    private columnListService: ColumnListService = inject(ColumnListService);

    columnList: Array<ColumnList> = []
    tasks: Array<Task> = [];

    getConnectedColumns(columnId: string) {
        return this.columnList.map(c => c.id).filter(cId => cId != columnId);
    }

    getTasks(columnId: string) {
        return this.tasks.filter(t => t.columnId == columnId);
    }

    ngOnInit() {
        this.columnListService.loadColumns().subscribe(cl => {
            console.log("Columns", cl)
            this.columnList = cl
        });
        this.taskService.loadTasks().subscribe(t => {
            console.log("Tasks", t);
            this.tasks = t
        });
    }

    onDrop(task: Task, newColumnId: string) {
        this.taskService.updateTaskColumn(task.id, newColumnId);
    }

    openAddTaskModal(columnId: string) {
        this.createTaskModal.openAddTaskModal({ columnId });
    }

    openAddColumnModal() {
        this.createColumnModal.open();
    }

    deleteColumn(id: string) {
        if (confirm('Are you sure you want to delete this column? All tasks in this column will be hidden unless you move them.')) {
            this.columnListService.deleteList(id);
        }
    }
}