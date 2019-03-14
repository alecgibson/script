import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit } from '@angular/core';
import { BlockService } from '../../services/block.service';
import { QuillService } from '../../services/quill.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  // Set no encapsulation so we can style elements within Quill
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, AfterViewInit {
  private _quill: any;

  constructor(
    private blockService: BlockService,
    private quillService: QuillService
  ) { }

  public ngOnInit() {
    this._quill = this.quillService.bindTo('#editor');

    this.setKeyboardBindings();
    this.setBlockTypeBinding();

    setTimeout(() => this.quillService.focus());
  }

  public ngAfterViewInit() {
    setTimeout(() => this.updateBlockType());
  }

  private setBlockTypeBinding() {
    this._quill.on('text-change', () => this.updateBlockType());
    this._quill.on('selection-change', () => this.updateBlockType());
  }

  private setKeyboardBindings() {
    this.keepKeyBindings(['bold', 'italic']);
    this._quill.keyboard.addBinding({ key: 'Tab' }, () => this.handleTab());
  }

  private updateBlockType() {
    const currentParagraph = this.quillService.currentParagraph();
    this.blockService.setBlockTypeFromParagraph(currentParagraph);
  }

  private keepKeyBindings(bindingKeysToKeep) {
    bindingKeysToKeep = new Set(bindingKeysToKeep);

    const bindingKeys = Object.keys(this._quill.keyboard.bindings);
    for (let index = 0; index < bindingKeys.length; index++) {
      const key = bindingKeys[index];
      if (!bindingKeysToKeep.has(key)) {
        delete this._quill.keyboard.bindings[key];
      }
    }
  }

  private handleTab() {
    const selection = this._quill.getSelection();
    if (!selection) {
      return;
    }

    const blot = this._quill.getLeaf(selection.index);
    this.blockService.toggle(blot);
  }
}
