import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/chart/dashboard.component";
import { IconsComponent } from "../../pages/crud/icons.component";

export const AdminLayoutRoutes: Routes = [
  { path: "chart", component: DashboardComponent },
  { path: "crud", component: IconsComponent },
];
