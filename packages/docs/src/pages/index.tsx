import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Flex, List } from '@mantine/core';
import { Playground } from '@site/src/components/Playground';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';
import clsx from 'clsx';

import styles from './index.module.css';
import { InstallInstructions } from '@site/src/components/InstallInstructions';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className={clsx('hero__title', styles.headingTitle)}>
          🌨️ {siteConfig.title}
        </Heading>
        <p className={clsx('hero__subtitle', styles.headingSubtitle)}>
          {siteConfig.tagline}
        </p>
        <List
          icon="✅"
          styles={{
            root: {
              textAlign: 'left',
              margin: '0 auto',
              width: 'fit-content',
            },
          }}
        >
          <List.Item>
            Web Workers + Offscreen Canvas to keep your main thread chilling 😎
          </List.Item>
          <List.Item>No performance impact to your website ⚡️</List.Item>
          <List.Item>0 dependencies ✨</List.Item>
          <List.Item>Customizable 🎨 </List.Item>
          <List.Item>Adds some festive fun ☃️</List.Item>
        </List>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="A performant snowfall effect for your website using canvas and web workers"
    >
      <HomepageHeader />
      <main>
        <Flex wrap="wrap" maw="100%" p="sm" gap="lg">
          <InstallInstructions />
          <Playground />
        </Flex>
      </main>
    </Layout>
  );
}
