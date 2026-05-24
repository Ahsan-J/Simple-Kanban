import { Component, Input } from "@angular/core";
import { Task } from "../../models/task.model";
import { DatePipe, NgClass } from "@angular/common";

@Component({
    selector: 'task-card',
    templateUrl: './task-card.component.html',
    imports: [DatePipe, NgClass]
})
export class TaskCardComponent {
    @Input('task') task: Task | null = null;

    getStatusClass = (columnId?: string | null) => {
        return "bg-green-500 text-white";
        // if (!status) return ""
        // const statusClassMap: Record<TaskStatus, string> = {
        //     [TaskStatus.TODO]: 'bg-green-500 text-white',
        //     [TaskStatus.PROGRESS]: 'bg-amber-500 text-black',
        //     [TaskStatus.DONE]: 'bg-red-500 text-white',
        //     [TaskStatus.NONE]: 'bg-red-500 text-white',
        // };
        // return statusClassMap[status];
    }
}