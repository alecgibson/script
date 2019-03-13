import { Injectable } from "@angular/core";
import Quill from '../quill/quill';
import { BlockClass } from "../quill/formats/block-class";
import { DomService } from "./dom.service";
import { BlockSelectComponent } from "../components/block-select/block-select.component";

@Injectable({
  providedIn: 'root',
})
export class QuillService {
  private _quill: any;
  private _blockSelect: HTMLElement;

  public constructor(private domService: DomService) { }

  public bindTo(selector: string) {
    this._quill = new Quill(selector, {
      theme: 'script',
    });

    this.addBlockSelect();
    // this.registerListeners();

    // TODO: Remove
    this._quill.on('text-change', () => {
      console.log(this._quill.getContents());
    });

    return this._quill;
  }

  public quill() {
    return this._quill;
  }

  public paragraphFromBlot(blot: any) {
    if (!Array.isArray(blot)) {
      blot = [blot];
    }

    if (!blot[0] || !blot[0].domNode) {
      return null;
    }

    return this.getParagraph(blot[0].domNode);
  }

  public getParagraph(node: Node): HTMLElement {
    if (!node) {
      return null;
    }

    if (node.nodeType === Node.ELEMENT_NODE && node.nodeName.toLowerCase() === 'p') {
      return node as HTMLElement;
    }

    return this.getParagraph(node.parentNode);
  }

  private addBlockSelect() {
    console.log('ADD BLOCK SELECT');
    const toolbar = document.querySelector('.ql-toolbar');
    this.domService.appendComponent(BlockSelectComponent, toolbar);
    // const toolbar = document.querySelector('.ql-toolbar');
    // const select = document.createElement('select');

    // // TODO: Decouple display from enum?
    // Object.keys(BlockClass).forEach((key: string) => {
    //   const option = document.createElement('option');
    //   option.setAttribute('value', key.toLowerCase());
    //   option.innerText = key;
    //   select.appendChild(option);
    // });

    // toolbar.appendChild(select);
    // this._blockSelect = select;
  }

  private registerListeners() {
    this._quill.on('text-change', () => this.updateSelectedParagraphType());
    this._quill.on('selection-change', () => this.updateSelectedParagraphType());
  }

  // TODO: Trigger update when changing select - use a directive?
  private updateSelectedParagraphType() {
    const paragraph = this.currentParagraph();
    const blockKeys = Object.keys(BlockClass);

    for (let index = 0; index < blockKeys.length; index++) {
      const key = blockKeys[index];
      const value = BlockClass[key];

      if (paragraph.classList.contains(value)) {
        (<any> this._blockSelect).selectedIndex = index;
        return;
      }
    }
  }

  private currentParagraph(): HTMLElement {
    const selection = this._quill.getSelection();
    if (!selection) {
      return null;
    }

    const blot = this._quill.getLeaf(selection.index);
    return this.paragraphFromBlot(blot);
  }
}
