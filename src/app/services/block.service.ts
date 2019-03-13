import { Injectable } from "@angular/core";
import { BlockClass } from "../quill/formats/block-class";
import { QuillService } from "./quill.service";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class BlockService {
  // TODO: Move into another service for eg drop-down selection
  // TODO: Add all Final Draft classes
  public static CLASSES = [
    BlockClass.Character,
    BlockClass.Dialogue,
    BlockClass.Action,
  ];

  public blockType: string;
  private blockTypeChange = new Subject<string>();

  constructor(private quillService: QuillService) {
    this.blockTypeChange.subscribe((value: string) => {
      this.blockType = value;
    });
  }

  public setBlockType(blockType: string) {
    // TODO: Update current paragraph if needed
    console.log('SET BLOCK TYPE');
    console.log(blockType);
    this.blockTypeChange.next(blockType);
    console.log(this.blockType);
  }

  public setBlockTypeFromParagraph(paragraph: HTMLElement) {
    if (!paragraph) {
      return;
    }

    console.log('SET BLOCK TYPE FROM PARA');
    const blockKeys = Object.keys(BlockClass);

    for (let index = 0; index < blockKeys.length; index++) {
      const key = blockKeys[index];
      const value = BlockClass[key];

      if (paragraph.classList.contains(value)) {
        console.log('setting');
        console.log(key);
        this.setBlockType(key.toLowerCase());
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
}
