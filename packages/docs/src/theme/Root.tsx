import { MantineProvider } from '@mantine/core';
import { FC, PropsWithChildren } from 'react';

import '@mantine/core/styles.css';
import '@mantine/code-highlight/styles.css';

const Root: FC<PropsWithChildren> = ({ children }) => (
  <MantineProvider
    defaultColorScheme="dark"
    forceColorScheme="dark"
    theme={{
      primaryColor: 'gray',
    }}
  >
    {children}
  </MantineProvider>
);

export default Root;
