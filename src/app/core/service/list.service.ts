import { inject, Injectable, PLATFORM_ID } from "@angular/core";
import { ColumnList } from "../../shared/models/column-list.model";
import { BehaviorSubject, map, tap } from "rxjs";
import { isPlatformServer } from "@angular/common";

@Injectable({
    providedIn: 'root',
})
export class ColumnListService {
    private storageKey = "list";
    private platformId = inject(PLATFORM_ID);
    private listSubject: BehaviorSubject<Array<ColumnList>> = new BehaviorSubject<Array<ColumnList>>([]);
    private lists$ = this.listSubject.asObservable().pipe(
        tap((tasks => this.saveToStorage(tasks)))
    );

    getObservable() {
        return this.lists$.pipe(
            map(list => list.filter(l => !!l))
        )
    }

    loadColumns() {
        if(isPlatformServer(this.platformId)) return this.lists$;
        const taskString = localStorage.getItem(this.storageKey);
        
        if(taskString?.trim()) {
            const list: Array<ColumnList> = JSON.parse(taskString);
            if(list.length > 0) {
                this.listSubject.next(list.map(l => new ColumnList(l)));
                return this.lists$;
            }
        }

        this.fillDataIfEmpty([]);
        return this.lists$
    }

    fillDataIfEmpty(list: Array<ColumnList>) {
        if(list.length) return;

        const defaultColumns = [
            new ColumnList({ id: "todo", title: "Todo" }),
            new ColumnList({ id: "in-progress", title: "In Progress" }),
            new ColumnList({ id: "done", title: "Done" }),
        ];

        defaultColumns.forEach(c => c.isSystemGenerated = true);

        this.listSubject.next([...defaultColumns]);
    }

    addList(list: ColumnList) {
        this.listSubject.next([
            ...this.listSubject.value,
            list
        ]);
    }

    deleteList(id: string) {
        const filteredValues = this.listSubject.value.filter(t => t.id != id);
        this.listSubject.next(filteredValues);
    }

    private saveToStorage(list: Array<ColumnList>) {
        if(isPlatformServer(this.platformId)) return;
        localStorage.setItem(this.storageKey, JSON.stringify(list));
    }
}