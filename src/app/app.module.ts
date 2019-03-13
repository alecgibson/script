import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EditorComponent } from './components/editor/editor.component';
import { BlockSelectComponent } from './components/block-select/block-select.component';

@NgModule({
  declarations: [
    AppComponent,
    BlockSelectComponent,
    EditorComponent,
  ],
  entryComponents: [
    BlockSelectComponent,
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }