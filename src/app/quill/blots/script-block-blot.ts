import Block from 'quill/blots/block';

class ScriptBlockBlot extends Block {
  insertAt(index, value, def) {
    super.insertAt(index, value, def);
    this._updateClass();
  }

  insertBefore(blot, ref) {
    super.insertBefore(blot, ref);
    this._updateClass();
  }

  _updateClass() {
    console.log('UPDATE CLASS');
    console.log(this);
  }
}

export default ScriptBlockBlot;
