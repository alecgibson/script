import { Injectable } from "@angular/core";
import { BlockClass } from "../quill/formats/block-class";
import { QuillService } from "./quill.service";

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

  constructor(private quillService: QuillService) {}

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
