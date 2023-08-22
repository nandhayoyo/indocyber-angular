import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { ReactiveFormsModule } from "@angular/forms";

import { DashboardComponent } from "../../pages/chart/dashboard.component";
import { IconsComponent } from "../../pages/crud/icons.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  declarations: [DashboardComponent, IconsComponent],
})
export class AdminLayoutModule {}
