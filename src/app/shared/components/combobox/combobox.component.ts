import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlContainer, FormControl, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'combobox',
    templateUrl: './combobox.component.html',
    imports: [ReactiveFormsModule],
    
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class ComboboxComponent {
    @Input() formArrayName!: string 
    @Input() tags: Array<string> = [];
    @Output() onAddTag = new EventEmitter<string>();
    @Output() onRemoveTag = new EventEmitter<number>();

    input = new FormControl('');

    constructor() { }

    addTag() {
        const value = this.input.value?.trim();

        if (!value) return;

        // prevent duplicates
        if (this.tags.includes(value)) {
            this.input.setValue('');
            return;
        }

        this.onAddTag.emit(value);
        this.input.setValue('');
    }

    removeTag(index: number) {
        this.onRemoveTag.emit(index)
    }

    onEnter(event: Event) {
        event.preventDefault();
        this.addTag();
    }
}