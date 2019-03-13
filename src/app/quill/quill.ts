import Quill from 'quill/core';

import Bold from 'quill/formats/bold';
import Italic from 'quill/formats/italic';
import Link from 'quill/formats/link';
import Script from 'quill/formats/script';
import Strike from 'quill/formats/strike';
import Underline from 'quill/formats/underline';

import Toolbar from 'quill/modules/toolbar';
import ScriptTheme from './themes/script-theme';

import * as Icons from 'quill/ui/icons';
import Picker from 'quill/ui/picker';
import ColorPicker from 'quill/ui/color-picker';
import IconPicker from 'quill/ui/icon-picker';
import Tooltip from 'quill/ui/tooltip';

import ScriptBlockBlot from './blots/script-block-blot';
import ScriptBlockFormat from './formats/script-block-format';

Quill.register(
  {
    'blots/block': ScriptBlockBlot,
    'formats/script-block': ScriptBlockFormat,

    'formats/bold': Bold,
    'formats/italic': Italic,
    'formats/link': Link,
    'formats/script': Script,
    'formats/strike': Strike,
    'formats/underline': Underline,

    'modules/toolbar': Toolbar,
    'themes/script': ScriptTheme,

    'ui/icons': Icons,
    'ui/picker': Picker,
    'ui/icon-picker': IconPicker,
    'ui/color-picker': ColorPicker,
    'ui/tooltip': Tooltip,
  },
  true,
);

export default Quill;
