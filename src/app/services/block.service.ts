import { Injectable } from "@angular/core";
import { BlockClass } from "../quill/formats/block-class";
import { QuillService } from "./quill.service";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class BlockService {
  // TODO: Add all Final Draft classes
  private static CLASS_MAPPINGS = new Map<string, IClassMapping>([
    [BlockClass.Action, {
      nextParagraph: BlockClass.Action,
      nextTab: BlockClass.Character,
    }],
    [BlockClass.Character, {
      nextParagraph: BlockClass.Dialogue,
      nextTab: BlockClass.Action,
    }],
    [BlockClass.Dialogue, {
      nextParagraph: BlockClass.Character,
      nextTab: BlockClass.Parenthetical,
    }],
    [BlockClass.Parenthetical, {
      nextParagraph: BlockClass.Dialogue,
      nextTab: BlockClass.Action,
    }],
  ]);

  public blockType = new Subject<string>();

  constructor(private quillService: QuillService) {}

  public setBlockType(blockType: string) {
    console.log('SET BLOCK TYPE');
    blockType = blockType.toLowerCase();
    this.blockType.next(blockType);
    this.setToClass(this.quillService.currentParagraph(), blockType);
  }

  public setBlockTypeFromParagraph(paragraph: Element) {
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
    console.log('ENSURE HAS CLASS');
    const paragraph = this.quillService.paragraphFromBlot(blot);
    if (!paragraph || this.paragraphBlockType(paragraph)) {
      return;
    }

    const previousParagraph = paragraph.previousElementSibling;
    const previousType = this.paragraphBlockType(previousParagraph);
    const classMapping = this.getMapping(previousType);
    console.log(paragraph);
    console.log(previousParagraph);
    console.log(previousType);
    console.log(classMapping);

    // TODO: Change default to scene?
    const blockClass = classMapping ? classMapping.nextParagraph : BlockClass.Character;
    console.log(blockClass);

    paragraph.classList.add(blockClass);
  }

  public toggle(blot: any) {
    const paragraph = this.quillService.paragraphFromBlot(blot);
    this.applyNextClass(paragraph);
  }

  public removeAllBlockClasses(blot: any) {
    console.log('REMOVE ALL BLOCK CLASSES');
    console.log(paragraph);
    Object.keys(BlockClass)
      .map(key => BlockClass[key])
      .forEach((blockClass: string) => paragraph.classList.remove(blockClass));
  }

  private applyNextClass(paragraph: Element) {
    if (!paragraph) {
      return;
    }

    if (this.hasDefaultClass(paragraph)) {
      const blockType = this.paragraphBlockType(paragraph);
      const mapping = this.getMapping(blockType);
      return this.setToClass(paragraph, mapping.nextTab);
    }

    const blockKeys = Object.keys(BlockClass);

    for (let index = 0; index < blockKeys.length; index++) {
      const blockKey = blockKeys[index];
      const blockClass = BlockClass[blockKey];

      if (!paragraph.classList.contains(blockClass)) {
        continue;
      }

      paragraph.classList.remove(blockClass);

      const nextIndex = index === blockKeys.length - 1 ? 0 : index + 1;
      const nextKey = blockKeys[nextIndex];
      const nextClass = BlockClass[nextKey];
      paragraph.classList.add(nextClass);
    }
  }

  private hasDefaultClass(paragraph: Element): boolean {
    const previousParagraph = paragraph.previousElementSibling;
    const previousType = this.paragraphBlockType(previousParagraph);
    const previousMapping = this.getMapping(previousType);

    return previousMapping && previousMapping.nextParagraph === this.paragraphBlockType(paragraph);
  }

  private setToClass(paragraph: Element, blockType: string) {
    console.log('SET TO CLASS');
    console.log(paragraph);
    console.log(blockType);
    if (!paragraph || !blockType) {
      return;
    }

    const blockKey = Object.keys(BlockClass)
      .find(key => key.toLowerCase() === blockType);

    const blockClass = BlockClass[blockKey];

    if (!blockClass || paragraph.classList.contains(blockClass)) {
      console.log('no need to change');
      return;
    }

    console.log(blockClass);
    this.removeAllBlockClasses(paragraph);
    paragraph.classList.add(blockClass);
  }

  private paragraphBlockType(paragraph: Element): string {
    if (!paragraph) {
      return null;
    }

    const blockKeys = Object.keys(BlockClass);

    for (let index = 0; index < blockKeys.length; index++) {
      const blockKey = blockKeys[index];
      const blockClass = BlockClass[blockKey];
      if (paragraph.classList.contains(blockClass)) {
        return blockKey;
      }
    }

    return null;
  }

  private getMapping(blockType: string | BlockClass): IClassMapping {
    if (typeof blockType === 'string') {
      blockType = BlockClass[blockType];
    }

    return BlockService.CLASS_MAPPINGS.get(blockType);
  }
}

interface IClassMapping {
  nextParagraph: BlockClass,
  nextTab: BlockClass,
}
