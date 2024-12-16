import { CodeHighlight } from '@mantine/code-highlight';
import { Flex, Tabs } from '@mantine/core';
import React, { FC } from 'react';

enum PkgManager {
  NPM = 'npm',
  YARN = 'yarn',
  PNPM = 'pnpm',
}

export const InstallInstructions: FC = () => (
  <Flex direction="column" maw="100%">
    <Tabs defaultValue={PkgManager.NPM}>
      <Tabs.List>
        {Object.values(PkgManager).map(tab => (
          <Tabs.Tab value={tab} key={tab}>
            {tab}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      <Tabs.Panel value={PkgManager.NPM}>
        <CodeHighlight
          mt="sm"
          language="bash"
          code="npm install react-snow-overlay"
        />
      </Tabs.Panel>
      <Tabs.Panel value={PkgManager.YARN}>
        <CodeHighlight
          mt="sm"
          language="bash"
          code="yarn add react-snow-overlay"
        />
      </Tabs.Panel>
      <Tabs.Panel value={PkgManager.PNPM}>
        <CodeHighlight
          mt="sm"
          language="bash"
          code="pnpm add react-snow-overlay"
        />
      </Tabs.Panel>
    </Tabs>

    <CodeHighlight
      mt="lg"
      code={`import { SnowOverlay } from 'react-snow-overlay';
    
<SnowOverlay />`}
      highlightOnClient
    />
  </Flex>
);
