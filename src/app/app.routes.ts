import { Routes } from '@angular/router';
import { BoardComponent } from './feature/board/board.component';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
    {
        component: LayoutComponent,
        path: '',
        title: "Kanban",
        children: [
            {
                path: '', component: BoardComponent
            }
        ]
    }
];
