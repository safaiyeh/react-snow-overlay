import { Flex, Switch } from '@mantine/core';
import { FC, useState } from 'react';
import { SnowOverlay } from 'react-snow-overlay';

export const MountUnmountTest: FC = () => {
  const [snowOn, setSnowOn] = useState(false);

  return (
    <Flex>
      <Switch
        label={`${snowOn ? 'M' : 'Unm'}ounted`}
        checked={snowOn}
        onChange={e => setSnowOn(e.currentTarget.checked)}
      />
      {snowOn && <SnowOverlay />}
    </Flex>
  );
};
