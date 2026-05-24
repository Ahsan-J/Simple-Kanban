import { Component } from "@angular/core";
import { HeaderComponent } from "../shared/components/header/header.component";
import { RouterOutlet } from "@angular/router";

@Component({
    selector: 'layout',
    templateUrl: './layout.component.html',
    imports: [RouterOutlet, HeaderComponent]
})
export class LayoutComponent { }