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
    const blockClass = this.blockClass(blockType);
    this.setToClass(this.quillService.currentParagraph(), blockClass);
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

  public removeAllBlockClasses(paragraph: Element) {
    console.log('REMOVE ALL BLOCK CLASSES');
    console.log(paragraph);
    Object.keys(BlockClass)
      .map(key => BlockClass[key])
      .forEach((blockClass: string) => paragraph.classList.remove(blockClass));
  }

  private applyNextClass(paragraph: Element) {
    console.log('APPLY NEXT CLASS');
    if (!paragraph) {
      return;
    }
    console.log(paragraph);

    if (this.hasDefaultClass(paragraph)) {
      console.log('has default class');
      const blockType = this.paragraphBlockType(paragraph);
      const mapping = this.getMapping(blockType);
      console.log(blockType);
      console.log(mapping);
      return this.setToClass(paragraph, mapping.nextTab);
    }

    console.log('apply loop');
    const blockKeys = Object.keys(BlockClass);

    for (let index = 0; index < blockKeys.length; index++) {
      const blockKey = blockKeys[index];
      const blockClass = BlockClass[blockKey];
      console.log(blockKey);
      console.log(blockClass);

      if (paragraph.classList.contains(blockClass)) {
        console.log('remove class');
        paragraph.classList.remove(blockClass);

        const nextIndex = index === blockKeys.length - 1 ? 0 : index + 1;
        const nextKey = blockKeys[nextIndex];
        const nextClass = BlockClass[nextKey];
        console.log(nextKey);
        console.log(nextClass);
        paragraph.classList.add(nextClass);
        return;
      }
    }
  }

  private hasDefaultClass(paragraph: Element): boolean {
    console.log('HAS DEFAULT CLASS');
    const previousParagraph = paragraph.previousElementSibling;
    const previousType = this.paragraphBlockType(previousParagraph);
    const previousMapping = this.getMapping(previousType);

    console.log(previousParagraph);
    console.log(previousType);
    console.log(previousMapping);

    return previousMapping && previousMapping.nextParagraph === this.paragraphBlockClass(paragraph);
  }

  private setToClass(paragraph: Element, blockClass: string) {
    console.log('SET TO CLASS');
    console.log(paragraph);
    console.log(blockClass);
    if (!paragraph || !blockClass) {
      return;
    }

    console.log(blockClass);
    this.removeAllBlockClasses(paragraph);
    paragraph.classList.add(blockClass);
  }

  private blockClass(blockType: string): string {
    return blockType && BlockClass[blockType];
  }

  private paragraphBlockClass(paragraph: Element): string {
    const blockType = this.paragraphBlockType(paragraph);
    return this.blockClass(blockType);
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
