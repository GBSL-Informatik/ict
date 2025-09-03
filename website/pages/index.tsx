import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.scss';
import featuresStyles from '../components/Feature/List/styles.module.scss';
import Head from '@docusaurus/Head';
import Feature from '../components/Feature';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { translate } from '@docusaurus/Translate';

const QuickLinks: React.ComponentProps<typeof Feature>[] = [
    {
        name: translate({
            message: 'Galerie',
            id: 'main.link.gallerie.text'
        }),
        icon: 'mdi-view-gallery-outline',
        route: '/docs/gallery/',
        description: translate({
            message: 'Update, Tools, Netiquette',
            id: 'main.link.gallerie.description'
        })
    }
];

const IndexPages: React.ComponentProps<typeof Feature>[] = [];

function HomepageHeader() {
    const { siteConfig } = useDocusaurusContext();
    const imgSrc = useBaseUrl('/img/logo.png');
    return (
        <header className={clsx('hero index-page', styles.heroBanner)}>
            <img src={imgSrc} className={styles.logo} />
            <div className={clsx('container', 'index-page-title')}>
                <h1 className="hero__title">{siteConfig.title}</h1>
                <p className={clsx('hero__subtitle', styles.subTitle)}>{siteConfig.tagline}</p>
            </div>
        </header>
    );
}

export default function Home() {
    return (
        <>
            <Head>
                <meta property="og:description" content="Anleitungen, Tipps & Tricks" />
                <meta property="og:image" content="https://ict.gbsl.website/img/logo.png" />
            </Head>
            <Layout description="Anleitungen, Tipps & Tricks">
                <HomepageHeader />
                <main>
                    <div className={clsx(featuresStyles.features, featuresStyles.max2, styles.center)}>
                        {QuickLinks.map((feat, idx) => (
                            <Feature {...feat} key={idx} />
                        ))}
                    </div>
                    <div className={featuresStyles.features}>
                        {IndexPages.map((feat, idx) => (
                            <Feature {...feat} key={idx} />
                        ))}
                    </div>
                </main>
            </Layout>
        </>
    );
}
