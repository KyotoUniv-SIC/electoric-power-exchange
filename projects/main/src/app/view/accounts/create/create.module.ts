import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CreateComponent } from "./create.component";
import { RouterModule } from '@angular/router';
import { MaterialModule } from "../../../material.module";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";
import {MatRadioModule} from '@angular/material/radio';
@NgModule({
  declarations: [CreateComponent],
  imports: [CommonModule, RouterModule,MaterialModule,MatInputModule,MatCheckboxModule,MatRadioModule],

  exports: [CreateComponent]
})
export class CreateModule {}
