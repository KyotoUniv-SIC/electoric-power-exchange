import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AccountsComponent } from "./accounts.component";
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AccountsComponent],
  imports: [CommonModule, RouterModule],
  exports: [AccountsComponent]
})
export class AccountsModule {}
