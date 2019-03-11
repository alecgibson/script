import { Component, OnInit } from '@angular/core';
import Quill from '../quill/quill';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  private quill: any;

  constructor() { }

  ngOnInit() {
    this.quill = new Quill('#editor', {
      theme: 'bubble',
    });

    setTimeout(() => this.focus());
  }

  focus() {
    this.quill.root.focus();
  }

}
