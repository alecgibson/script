import BaseTheme from 'quill/themes/base';
import icons from 'quill/ui/icons';

export default class ScriptTheme extends BaseTheme {
  constructor(quill, options) {
    options.modules.toolbar.container = [['bold', 'italic']];
    super(quill, options);
  }

  extendToolbar(toolbar) {
    toolbar.container.classList.add('ql-script');
    this.buildButtons(toolbar.container.querySelectorAll('button'), icons);
    // TODO: Put back when we have paragraph type select?
    // this.buildPickers(toolbar.container.querySelectorAll('select'), icons);
  }
}
