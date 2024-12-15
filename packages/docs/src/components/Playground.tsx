import { CodeHighlight } from '@mantine/code-highlight';
import {
  Button,
  ColorInput,
  Divider,
  Flex,
  NumberInput,
  Select,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { FC, useMemo, useState } from 'react';

import {
  DEFAULT_SNOW_OPTIONS,
  SNOW_OPTIONS_SPEED_MAP,
  SnowOverlay,
  SnowOverlayProps,
} from 'react-snow-overlay';

interface PlaygroundProps {
  showCode?: boolean;
}

export const Playground: FC<PlaygroundProps> = ({ showCode }) => {
  const [snowOverlayProps, setSnowOverlayProps] =
    useState<SnowOverlayProps>(DEFAULT_SNOW_OPTIONS);

  const [debouncedSnowOverlayProps] = useDebouncedValue(snowOverlayProps, 100);

  const code = useMemo(() => {
    const propsStr = Object.keys(debouncedSnowOverlayProps)
      .map(prop => {
        if (debouncedSnowOverlayProps[prop] == DEFAULT_SNOW_OPTIONS[prop]) {
          return null;
        }

        if (typeof debouncedSnowOverlayProps[prop] === 'object') {
          return `${prop}={${JSON.stringify(debouncedSnowOverlayProps[prop], null, 2)}}`;
        } else if (typeof debouncedSnowOverlayProps[prop] === 'string') {
          return `${prop}="${debouncedSnowOverlayProps[prop]}"`;
        } else {
          return `${prop}={${debouncedSnowOverlayProps[prop]}}`;
        }
      })
      .filter(Boolean)
      .join(' ');

    return `import { SnowOverlay } from 'react-snow-overlay';
    
<SnowOverlay ${propsStr}${propsStr.length ? ' ' : ''}/>`;
  }, [debouncedSnowOverlayProps]);

  return (
    <>
      <SnowOverlay {...debouncedSnowOverlayProps} />
      <div
        style={{
          maxWidth: 'min(100%, 464px)',
        }}
      >
        <Flex direction="column" gap="sm" maw={444}>
          <NumberInput
            allowNegative={false}
            allowDecimal={false}
            label="Particle count"
            description="The maximum number of snow particles displayed on the screen at once. Note: High values may cause performance issues."
            value={snowOverlayProps.maxParticles}
            onChange={newParticles =>
              setSnowOverlayProps(p => ({
                ...p,
                maxParticles: Number(newParticles),
              }))
            }
          />

          <ColorInput
            format="rgba"
            label="Color"
            description="Color of snow particles"
            placeholder={DEFAULT_SNOW_OPTIONS.color}
            value={snowOverlayProps.color as string}
            onChange={newColor =>
              setSnowOverlayProps(p => ({
                ...p,
                color: newColor,
              }))
            }
          />

          <Select
            label="Particle speed"
            description="How fast snow falls down the screen"
            data={Object.keys(SNOW_OPTIONS_SPEED_MAP)}
            value={snowOverlayProps.speed as string}
            onChange={newSpeedKey =>
              setSnowOverlayProps(p => ({
                ...p,
                speed: newSpeedKey as SnowOverlayProps['speed'],
              }))
            }
          />

          <Button
            mt="lg"
            onClick={() => setSnowOverlayProps(DEFAULT_SNOW_OPTIONS)}
            variant="light"
          >
            Reset
          </Button>

          {showCode && (
            <>
              <Divider my="xl" />
              <CodeHighlight language="tsx" code={code} highlightOnClient />
            </>
          )}
        </Flex>
      </div>
    </>
  );
};
