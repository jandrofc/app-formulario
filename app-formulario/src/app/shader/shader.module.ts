import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [HeaderComponent,FooterComponent],
  imports: [
    CommonModule,
    RouterLink,
    IonicModule
  ],
  exports: [HeaderComponent,FooterComponent]
})
export class ShaderModule { }
