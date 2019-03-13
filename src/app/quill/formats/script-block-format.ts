import ScriptBlockBlot from '../blots/script-block-blot';
import { BlockClass } from './block-class';

export default class ScriptBlockFormat extends ScriptBlockBlot {
  public static formats(domNode: HTMLElement) {
    for (const item in BlockClass) {
      if (domNode.classList.contains(BlockClass[item])) {
        return item.toLowerCase();
      }
    }
  }
}
