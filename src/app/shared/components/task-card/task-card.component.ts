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
        const base = "rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border ";
        
        switch(columnId) {
            case 'todo':
                return base + "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800";
            case 'in-progress':
                return base + "bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800";
            case 'done':
                return base + "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800";
            default:
                return base + "bg-slate-50 text-slate-600 border-slate-100 dark:bg-slate-900/20 dark:text-slate-400 dark:border-slate-800";
        }
    }
}