import Quill from 'quill/core';

import Bold from 'quill/formats/bold';
import Italic from 'quill/formats/italic';
import Link from 'quill/formats/link';
import Script from 'quill/formats/script';
import Strike from 'quill/formats/strike';
import Underline from 'quill/formats/underline';

import Toolbar from 'quill/modules/toolbar';

import Icons from 'quill/ui/icons';
import Picker from 'quill/ui/picker';
import ColorPicker from 'quill/ui/color-picker';
import IconPicker from 'quill/ui/icon-picker';
import Tooltip from 'quill/ui/tooltip';

import BubbleTheme from 'quill/themes/bubble';

adjustIconPaths(Icons);
console.log(Icons);

Quill.register(
  {
    'formats/bold': Bold,
    'formats/italic': Italic,
    'formats/link': Link,
    'formats/script': Script,
    'formats/strike': Strike,
    'formats/underline': Underline,

    'modules/toolbar': Toolbar,

    'themes/bubble': BubbleTheme,

    'ui/icons': Icons,
    'ui/picker': Picker,
    'ui/icon-picker': IconPicker,
    'ui/color-picker': ColorPicker,
    'ui/tooltip': Tooltip,
  },
  true,
);

function adjustIconPaths(icons) {
  Object.keys(icons).forEach((key) => {
    const value = icons[key];
    if (typeof value === 'string') {
      icons[key] = `assets/icons/${value}`;
    } else {
      adjustIconPaths(value);
    }
  });
}

export default Quill;
