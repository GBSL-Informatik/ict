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
        route: '/tdev/gallery/',
        description: translate({
            message: 'Update, Tools, Netiquette',
            id: 'main.link.gallerie.description'
        })
    }
];

const IndexPages: React.ComponentProps<typeof Feature>[] = [
    {
        name: translate({
            message: 'Onboarding',
            id: 'main.link.onboarding.name'
        }),
        icon: 'mdi-hand-wave-outline',
        route: '/onboarding',
        description: translate({
            message: 'Willkommen an der Schule',
            id: 'main.link.onboarding.description'
        })
    },
    {
        name: translate({
            message: 'Schulinfrastruktur',
            id: 'main.link.infrastructure.name'
        }),
        icon: 'mdi-home-circle',
        route: '/infrastructure',
        description: translate({
            message: 'Unterrichtszimmer, Drucker, Infrastruktur',
            id: 'main.link.infrastructure.description'
        })
    },
    {
        name: translate({
            message: 'Software & Kommunikation',
            id: 'main.link.software-communication.name'
        }),
        icon: 'mdi-cellphone-link',
        route: '/software-communication',
        description: translate({
            message: 'Office365, Adobe, exam.net',
            id: 'main.link.software-communication.description'
        })
    },
    {
        name: translate({
            message: 'Schulkonto',
            id: 'main.link.schulkonto.text'
        }),
        icon: 'mdi-account-circle-outline',
        route: '/accounts',
        description: translate({
            message: 'Neu am GBSL, Schulkonto, Austritt',
            id: 'main.link.schulkonto.description'
        })
    },
    {
        name: translate({
            message: 'Tipps & Tricks',
            id: 'main.link.tips.name'
        }),
        icon: 'mdi-lightbulb-on-outline',
        route: '/tips',
        description: translate({
            message: 'Verschiedene Tipps und Tricks',
            id: 'main.link.tips.description'
        })
    }
];

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
