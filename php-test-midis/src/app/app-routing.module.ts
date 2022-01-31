import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddFormComponent } from "./add-form/add-form.component";
import { BookComponent } from "./book/book.component";

const appRoutes: Routes = [
    {path: '', redirectTo: '/message', pathMatch: 'full'},
    {path: 'message', component: AddFormComponent},
    {path: 'book', component: BookComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule{}