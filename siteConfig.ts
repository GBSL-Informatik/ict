// This file is never changed by teaching-dev.
// Use it to override or extend your app configuration.

import { devModeAccessLocalFS, taskStateOverview } from './src/siteConfig/navbarItems';
import { SiteConfigProvider } from './src/siteConfig/siteConfig';
const GIT_COMMIT_SHA = process.env.GITHUB_SHA || Math.random().toString(36).substring(7);
const ADMONITION_CONFIG = {
    admonitions: {
        keywords: ['aufgabe', 'finding'],
        extendDefaults: true
    }
};

const getSiteConfig: SiteConfigProvider = () => {
    return {
        title: 'ICT am Gymnasium Biel-Seeland',
        tagline: 'Anleitungen, Tipps und Tricks',
        url: 'https://ict-gbsl.netlify.app',
        baseUrl: '/',
        favicon: 'img/favicon.ico',
        organizationName: 'GBSL-Informatik',
        projectName: 'ict',
        blog: false,
        onBrokenLinks: 'warn',
        docs: {
            ...ADMONITION_CONFIG,
            routeBasePath: '/',
            lastVersion: 'current',
            versions: {
                current: {
                    label: 'ICT',
                    banner: 'none',
                    badge: false
                },
                onboarding: {
                    label: 'Onboarding',
                    banner: 'none',
                    badge: false
                }
            }
        },
        navbarItems: [taskStateOverview, devModeAccessLocalFS],
        footer: {
            style: 'dark',
            links: [],
            copyright: `Copyright © ${new Date().getFullYear()} Begleitgruppe DigiTrans - GBSL. <br />
      <a class="badge badge--primary" href="https://github.com/GBSL-Informatik/ict-v2/commits/${GIT_COMMIT_SHA}">
            ᚶ ${GIT_COMMIT_SHA.substring(0, 7)}
      </a>
      `
        },
        tdevConfig: {
            excalidraw: {
                excalidoc: true
            }
        },
        apiDocumentProviders: [require.resolve('@tdev/page-read-check/register')]
    };
};

export default getSiteConfig;
