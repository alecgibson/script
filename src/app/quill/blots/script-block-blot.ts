import Block from 'quill/blots/block';
import { BlockService } from '../../services/block.service';

export default class ScriptBlockBlot extends Block {
  public static blotName = 'block';
  public static tagName = 'P';
  public static blockService: BlockService;
  public domNode;

  insertAt(index, value, def) {
    super.insertAt(index, value, def);
    this._ensureHasClass();
  }

  insertBefore(blot, ref) {
    super.insertBefore(blot, ref);
    this._ensureHasClass();
  }

  _ensureHasClass() {
    if (!ScriptBlockBlot.blockService) {
      return;
    }

    if (!this.domNode.innerText.trim()) {
      ScriptBlockBlot.blockService.removeAllBlockClasses(this.domNode);
    }

    ScriptBlockBlot.blockService.ensureHasClass(this);
  }
}
