import { Injectable } from "@angular/core";
import Quill from '../quill/quill';
import { BlockClass } from "../quill/formats/block-class";

@Injectable({
  providedIn: 'root',
})
export class QuillService {
  private _quill: any;
  private _blockSelect: HTMLElement;

  public constructor() { }

  public bindTo(selector: string) {
    this._quill = new Quill(selector, {
      theme: 'script',
    });

    // TODO: Remove
    this._quill.on('text-change', () => {
      console.log(this._quill.getContents());
    });

    return this._quill;
  }

  public quill() {
    return this._quill;
  }

  public focus() {
    this._quill.root.focus();
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

  public currentParagraph(): HTMLElement {
    const selection = this._quill.getSelection();
    if (!selection) {
      return null;
    }

    const blot = this._quill.getLeaf(selection.index);
    return this.paragraphFromBlot(blot);
  }
}
