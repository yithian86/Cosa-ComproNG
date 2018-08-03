import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular/side-drawer-directives";

import { AppComponent } from "~/app.component";
import { routes, navigatableComponents } from "~/app.routing";
import { DatabaseService } from "~/services/database.service";

@NgModule({
  declarations: [AppComponent, ...navigatableComponents],
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(routes),
    NativeScriptUISideDrawerModule
  ],
  providers: [DatabaseService],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule { }
