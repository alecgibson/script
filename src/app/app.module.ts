import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EditorComponent } from './components/editor/editor.component';
import { BlockSelectComponent } from './components/block-select/block-select.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BlockSelectComponent,
    EditorComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }