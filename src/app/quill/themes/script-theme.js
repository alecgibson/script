import BaseTheme from 'quill/themes/base';
import icons from 'quill/ui/icons';

// TODO: Disable formatting on certain elements (character names, scenes, etc.)
export default class ScriptTheme extends BaseTheme {
  constructor(quill, options) {
    options.modules.toolbar.container = [['bold', 'italic']];
    super(quill, options);
  }

  extendToolbar(toolbar) {
    toolbar.container.classList.add('ql-script');
    this.buildButtons(toolbar.container.querySelectorAll('button'), icons);
  }
}
