import { Component, inject, PLATFORM_ID, ViewChild, signal } from "@angular/core";
import { CreateTaskFormComponent } from "../create-task-form/create-task-form.component";
import { isPlatformBrowser } from "@angular/common";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    imports: [CreateTaskFormComponent]
})
export class HeaderComponent {
    @ViewChild(CreateTaskFormComponent) createTaskModal!: CreateTaskFormComponent;
    
    private platformId = inject(PLATFORM_ID);
    isDarkMode = signal(false);

    constructor() {
        if (isPlatformBrowser(this.platformId)) {
            const isDark = document.documentElement.classList.contains('dark') || 
                          (window.matchMedia('(prefers-color-scheme: dark)').matches && 
                           !document.documentElement.classList.contains('light'));
            this.isDarkMode.set(isDark);
        }
    }

    openModal() {
        this.createTaskModal.openAddTaskModal()
    }

    toggleTheme() {
        if (!isPlatformBrowser(this.platformId)) return;
        
        const html = document.documentElement;
        if (html.classList.contains('dark')) {
            html.classList.remove('dark');
            html.classList.add('light');
            this.isDarkMode.set(false);
        } else {
            html.classList.add('dark');
            html.classList.remove('light');
            this.isDarkMode.set(true);
        }
    }
}