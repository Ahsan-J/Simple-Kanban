import { Component, inject } from "@angular/core";
import { HeaderComponent } from "../shared/components/header/header.component";
import { RouterOutlet } from "@angular/router";
import { NotificationService } from "../core/service/notification.service";

@Component({
    selector: 'layout',
    templateUrl: './layout.component.html',
    imports: [RouterOutlet, HeaderComponent]
})
export class LayoutComponent {
    private notificationService = inject(NotificationService);
}