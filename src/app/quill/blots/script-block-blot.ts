import Block from 'quill/blots/block';
import { BlockService } from '../../services/block.service';
import { QuillService } from '../../services/quill.service';

export default class ScriptBlockBlot extends Block {
  public static blotName = 'block';
  public static tagName = 'P';
  public domNode;
  private readonly blockService = new BlockService(new QuillService());

  insertAt(index, value, def) {
    super.insertAt(index, value, def);
    this._ensureHasClass();
  }

  insertBefore(blot, ref) {
    super.insertBefore(blot, ref);
    this._ensureHasClass();
  }

  _ensureHasClass() {
    if (!this.domNode.innerText.trim()) {
      this.blockService.removeAllBlockClasses(this.domNode);
    }

    this.blockService.ensureHasClass(this);
  }
}
