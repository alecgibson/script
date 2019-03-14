import { Injectable } from "@angular/core";
import { BlockClass } from "../quill/formats/block-class";
import { QuillService } from "./quill.service";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class BlockService {
  // TODO: Add mappings for going from one type to another
  // TODO: Add all Final Draft classes
  public static CLASSES = [
    BlockClass.Character,
    BlockClass.Dialogue,
    BlockClass.Action,
  ];

  public blockType = new Subject<string>();

  constructor(private quillService: QuillService) {}

  public setBlockType(blockType: string) {
    blockType = blockType.toLowerCase();
    this.blockType.next(blockType);
    this.setToClass(this.quillService.currentParagraph(), blockType);
  }

  public setBlockTypeFromParagraph(paragraph: HTMLElement) {
    if (!paragraph) {
      return;
    }

    const blockKeys = Object.keys(BlockClass);

    for (let index = 0; index < blockKeys.length; index++) {
      const key = blockKeys[index];
      const value = BlockClass[key];

      if (paragraph.classList.contains(value)) {
        this.setBlockType(key);
        return;
      }
    }
  }

  public ensureHasClass(blot: any) {
    const paragraph = this.quillService.paragraphFromBlot(blot);
    if (!paragraph) {
      return;
    }

    for (let index = 0; index < BlockService.CLASSES.length; index++) {
      const cssClass = BlockService.CLASSES[index];
      if (paragraph.classList.contains(cssClass)) {
        return;
      }
    }

    paragraph.classList.add(BlockService.CLASSES[0]);
  }

  public toggle(blot: any) {
    const paragraph = this.quillService.paragraphFromBlot(blot);
    this.applyNextClass(paragraph);
  }

  private applyNextClass(paragraph: HTMLElement) {
    if (!paragraph) {
      return;
    }

    for (let index = 0; index < BlockService.CLASSES.length; index++) {
      const cssClass = BlockService.CLASSES[index];

      if (index === BlockService.CLASSES.length - 1) {
        paragraph.classList.remove(cssClass);
        const nextCssClass = BlockService.CLASSES[0];
        paragraph.classList.add(nextCssClass);
        return;
      }

      if (paragraph.classList.contains(cssClass)) {
        paragraph.classList.remove(cssClass);
        const nextCssClass = BlockService.CLASSES[index + 1];
        paragraph.classList.add(nextCssClass);
        return;
      }
    }
  }

  private setToClass(paragraph: HTMLElement, blockType: string) {
    if (!paragraph || !blockType) {
      return;
    }

    const blockKey = Object.keys(BlockClass)
      .find(key => key.toLowerCase() === blockType);

    const blockClass = BlockClass[blockKey];

    if (!blockClass || paragraph.classList.contains(blockClass)) {
      return;
    }

    this.removeAllBlockClasses(paragraph);
    paragraph.classList.add(blockClass);
  }

  private removeAllBlockClasses(paragraph: HTMLElement) {
    Object.keys(BlockClass)
      .map(key => BlockClass[key])
      .forEach((blockClass: string) => paragraph.classList.remove(blockClass));
  }
}
