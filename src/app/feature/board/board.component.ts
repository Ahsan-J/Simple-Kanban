import { Component, inject, OnInit } from "@angular/core";
import { TaskColumnComponent } from "../../shared/components/task-column/task-column.component";
import { CreateTaskFormComponent } from "../../shared/components/create-task-form/create-task-form.component";
import { TaskService } from "../../core/service/task.service";
import { AsyncPipe } from "@angular/common";
import { Task } from "../../shared/models/task.model";
import { ColumnListService } from "../../core/service/list.service";
import { firstValueFrom } from "rxjs";
import { ColumnList } from "../../shared/models/column-list.model";

@Component({
    selector: 'task-board',
    templateUrl: './board.component.html',
    imports: [TaskColumnComponent, CreateTaskFormComponent],
})
export class BoardComponent implements OnInit {
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
        this.columnListService.loadColumns().subscribe(cl => this.columnList = cl);
        this.taskService.loadTasks().subscribe(t => this.tasks = t);
    }

    onDrop(task: Task, newColumnId: string) {
        this.taskService.updateTaskColumn(task.id, newColumnId);
    }
}