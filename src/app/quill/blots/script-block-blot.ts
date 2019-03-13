import Block from 'quill/blots/block';
import { BlockService } from '../../services/block.service';
import { QuillService } from '../../services/quill.service';

export default class ScriptBlockBlot extends Block {
  public static blotName = 'block';
  public static tagName = 'P';

  insertAt(index, value, def) {
    super.insertAt(index, value, def);
    this._ensureHasClass();
  }

  insertBefore(blot, ref) {
    super.insertBefore(blot, ref);
    this._ensureHasClass();
  }

  _ensureHasClass() {
    // TODO: Check the previous block, and apply an appropriate class
    new BlockService(new QuillService(null)).ensureHasClass(this);
  }
}
