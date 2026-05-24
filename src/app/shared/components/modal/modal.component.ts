import { isPlatformServer, NgClass } from '@angular/common';
import {
    Component,
    EventEmitter,
    Input,
    Output,
    HostListener,
    ElementRef,
    AfterViewInit,
    PLATFORM_ID,
    Inject,
} from '@angular/core';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    imports: [NgClass]
})
export class ModalComponent {
    protected isOpen = false;
    
    @Input() title = '';
    @Output() onClose = new EventEmitter<void>();

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        private el: ElementRef,
    ) { }

    ngAfterViewInit() {
        this.toggleBodyScroll();
    }

    ngOnChanges() {
        this.toggleBodyScroll();
    }

    open() {
        this.isOpen = true;
    }

    close() {
        this.isOpen = false;
        this.onClose.emit();
        this.toggleBodyScroll();
    }

    // Close on ESC key
    @HostListener('document:keydown.escape')
    onEsc() {
        if (this.isOpen) this.close();
    }

    // Close when clicking outside modal
    onBackdropClick(event: MouseEvent) {
        this.close();
    }

    onDialogClick(event: MouseEvent) {
        event.stopPropagation();
    }

    trapFocus(event: KeyboardEvent) {
        const focusable = this.el.nativeElement.querySelectorAll(
            'button, [tabindex]:not([tabindex="-1"])'
        );

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.key === 'Tab') {
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }
    }

    private toggleBodyScroll() {
        if(isPlatformServer(this.platformId)) return;
        if (this.isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
}