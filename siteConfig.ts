// This file is never changed by teaching-dev.
// Use it to override or extend your app configuration.

import {
    detailsPluginConfig,
    recommendedBeforeDefaultRemarkPlugins
} from './src/siteConfig/markdownPluginConfigs';
import { devModeAccessLocalFS, taskStateOverview } from './src/siteConfig/navbarItems';
import { SiteConfigProvider } from './src/siteConfig/siteConfig';
import detailsPlugin from './src/plugins/remark-details/plugin';
import { PluginOptions } from '@docusaurus/types';
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
        url: 'https://ict.gbsl.website',
        baseUrl: '/',
        favicon: 'img/favicon.ico',
        organizationName: 'GBSL-Informatik',
        projectName: 'ict',
        blog: false,
        onBrokenLinks: 'warn',
        locales: ['de'],
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
        siteStyles: ['website/css/custom.scss'],
        navbarItems: [taskStateOverview, devModeAccessLocalFS],
        footer: {
            style: 'dark',
            links: [
                {
                    items: [
                        {
                            label: 'ICT-Website V1 (Legacy)',
                            href: 'https://ict-v1.gbsl.website'
                        }
                    ]
                },
                {
                    items: [
                        {
                            label: 'GBSL Website',
                            href: 'https://gbsl.ch'
                        }
                    ]
                },
                {
                    items: [
                        {
                            label: 'Terminplan',
                            href: 'https://events.gbsl.website'
                        }
                    ]
                }
            ],
            copyright: `<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.de">
                            <div style="display: flex; flex-direction: column; align-items: center;">
                                <div>
                                    Copyright © ${new Date().getFullYear()} Begleitgruppe DigiTrans - GBSL.
                                </div>
                                <img style="height: 2em" src="/img/by-nc-sa.eu.svg" alt="CC-BY-NC-SA">
                            </div>
                        </a>
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
        themeConfig: {
            algolia: {
                appId: 'SMV7ALCKHR',
                apiKey: '804f01d86cb54c95c4821020bcd38dcb',
                indexName: 'ict-gbsl',
                searchPagePath: 'search'
            }
        },
        scripts: [
            {
                src: 'https://umami.gbsl.website/tell-me.js',
                ['data-website-id']: process.env.UMAMI_ID,
                ['data-domains']: 'ict.gbsl.website',
                async: true,
                defer: true
            }
        ],
        beforeDefaultRemarkPlugins: [
            ...recommendedBeforeDefaultRemarkPlugins.filter((p) => p !== detailsPluginConfig),
            [
                detailsPlugin,
                {
                    directiveNames: ['details', 'solution'],
                    classNames: {
                        details: 'details',
                        solution: 'solution'
                    },
                    defaultLabel: {
                        solution: 'Lösung'
                    }
                }
            ]
        ] as unknown as PluginOptions[],
        apiDocumentProviders: [require.resolve('@tdev/page-read-check/register')],
        plugins: [
            [
                '@docusaurus/plugin-client-redirects',
                {
                    redirects: [
                        {
                            from: '/support/it-hilfe/',
                            to: '/support/faq/'
                        }
                    ]
                }
            ]
        ]
    };
};

export default getSiteConfig;
