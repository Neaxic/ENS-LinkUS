import { useState } from 'react';
import { Popover, Text, Button, Image, ColorPicker } from '@mantine/core';

export default function CustomColorPicker() {
  const [opened, setOpened] = useState(false);
  const [colorPicker, setColorPicker] = useState('rgba(47, 119, 150, 0.7)');

  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      target={<Button onClick={() => setOpened((o) => !o)}>Toggle popover</Button>}
      width={260}
      position="bottom"
      withArrow
    >
      <div style={{ display: 'flex' }}>
        <ColorPicker value={colorPicker} onChange={setColorPicker} swatchesPerRow={7} format="hex" swatches={['#25262b', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']} />
      </div>
    </Popover>
  );
}