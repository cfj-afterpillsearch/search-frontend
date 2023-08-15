import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewlineToBrPipe } from './newline-to-br.pipe';

@NgModule({
  declarations: [NewlineToBrPipe],
  imports: [CommonModule],
  exports: [NewlineToBrPipe]
})
export class SharedModule { }
