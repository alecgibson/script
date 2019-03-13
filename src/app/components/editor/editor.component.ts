import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { BlockService } from '../../services/block.service';
import { QuillService } from '../../services/quill.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  // Set no encapsulation so we can style elements within Quill
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  private quill: any;

  constructor(
    private blockService: BlockService,
    private quillService: QuillService
  ) { }

  public ngOnInit() {
    this.quill = this.quillService.bindTo('#editor');

    this.setKeyboardBindings();

    setTimeout(() => this.quill.root.focus());
  }

  private setKeyboardBindings() {
    this.keepKeyBindings(['bold', 'italic']);
    this.quill.keyboard.addBinding({ key: 'Tab' }, () => this.handleTab());
  }

  private keepKeyBindings(bindingKeysToKeep) {
    bindingKeysToKeep = new Set(bindingKeysToKeep);

    const bindingKeys = Object.keys(this.quill.keyboard.bindings);
    for (let index = 0; index < bindingKeys.length; index++) {
      const key = bindingKeys[index];
      if (!bindingKeysToKeep.has(key)) {
        delete this.quill.keyboard.bindings[key];
      }
    }
  }

  private handleTab() {
    const selection = this.quill.getSelection();
    if (!selection) {
      return;
    }

    const blot = this.quill.getLeaf(selection.index);
    this.blockService.toggle(blot);
  }
}
