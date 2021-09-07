import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MessageComponent } from "./message.component";
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MessageComponent],
  imports: [CommonModule, RouterModule],
  exports: [MessageComponent]
})
export class MessageModule {}
