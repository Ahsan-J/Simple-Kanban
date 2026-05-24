import { inject, Injectable, PLATFORM_ID } from "@angular/core";
import { Task } from "../../shared/models/task.model";
import { BehaviorSubject, map, tap } from "rxjs";
import { isPlatformServer } from "@angular/common";

@Injectable({ providedIn: 'root' })
export class TaskService {
    private storageKey = "tasks"
    private platformId = inject(PLATFORM_ID);
    private tasksSubject: BehaviorSubject<Array<Task>> = new BehaviorSubject<Array<Task>>([]);
    private tasks$ = this.tasksSubject.asObservable().pipe(
        tap((tasks => this.saveToStorage(tasks)))
    );

    getTaskObservable() {
        return this.tasks$;
    }

    loadTasks() {
        if(isPlatformServer(this.platformId)) return this.tasks$;
        const taskString = localStorage.getItem(this.storageKey);
        if(!taskString?.trim()) return this.tasks$;
        this.tasksSubject.next(JSON.parse(taskString));
        return this.tasks$;
    }

    addTask(task: Task) {
        this.tasksSubject.next([
            ...this.tasksSubject.value,
            task
        ]);
    }

    deleteTask(id: string) {
        const filteredValues = this.tasksSubject.value.filter(t => t.id != id);
        this.tasksSubject.next(filteredValues);
    }

    updateTaskColumn(id: string, columnId: Task['columnId']) {
        const tasks = this.tasksSubject.value;

        const updated = tasks.map(task =>
            task.id === id ? { ...task, columnId } : task
        );

        this.tasksSubject.next(updated);
    }

    private saveToStorage(tasks: Array<Task>) {
        if(isPlatformServer(this.platformId)) return;
        localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    }
}