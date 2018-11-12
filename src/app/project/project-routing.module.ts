import { Routes, RouterModule } from "../../../node_modules/@angular/router";
import { ProjectListComponent } from "./project-list/project-list.component";
import { NgModule } from "@angular/core";

const routes:Routes = [
    {
        path:'projects',
        component:ProjectListComponent
    }
];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class ProjectRoutingModule{}