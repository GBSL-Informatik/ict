// This file is never changed by teaching-dev.
// Use it to override or extend your app configuration.

import {
    commentPluginConfig,
    detailsPluginConfig,
    recommendedBeforeDefaultRemarkPlugins,
    recommendedRemarkPlugins
} from './src/siteConfig/markdownPluginConfigs';
import { devModeAccessLocalFS, taskStateOverview } from './src/siteConfig/navbarItems';
import { SiteConfigProvider } from './src/siteConfig/siteConfig';
import detailsPlugin from './src/plugins/remark-details/plugin';
import { PluginConfig, PluginOptions } from '@docusaurus/types';
import logger from '@docusaurus/logger';
const GIT_COMMIT_SHA = process.env.GITHUB_SHA || Math.random().toString(36).substring(7);
const ADMONITION_CONFIG = {
    admonitions: {
        keywords: ['aufgabe', 'finding'],
        extendDefaults: true
    }
};
import dynamicRouter from './src/plugins/plugin-dynamic-routes';
import { type DirectusConfig } from '@ict/directus';

declare module './src/siteConfig/siteConfig' {
    export interface TdevConfig {
        directus: DirectusConfig;
    }
}

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
        defaultLocale: 'de',
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
        navbarItems: [
            taskStateOverview,
            devModeAccessLocalFS,
            { type: 'custom-languageHelp', position: 'right' }
        ],
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
                            href: 'https://www.gbsl.ch'
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
            },
            directus: {
                collection: 'ict_page_ratings',
                url: 'https://directus.gbsl.website'
            }
        },
        themeConfig: {
            algolia: {
                appId: 'SMV7ALCKHR',
                apiKey: '804f01d86cb54c95c4821020bcd38dcb',
                indexName: 'ict-gbsl',
                searchPagePath: 'search'
            },
            announcementBar: {
                backgroundColor: 'var(--ifm-color-primary-lightest)',
                textColor: '#000000',
                content:
                    '👋 Neu am GBSL? <a href="/onboarding">👉 Hier geht\'s zum ersten Schritt "Grundeinrichtung: Adminrechte"</a>',
                isCloseable: true
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
        remarkPlugins: recommendedRemarkPlugins.filter(
            (p) => p !== commentPluginConfig
        ) as unknown as PluginOptions[],
        apiDocumentProviders: [
            require.resolve('@tdev/page-read-check/register'),
            require.resolve('@ict/directus/register')
        ],
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
        ],
        transformers: {
            plugins: (current: PluginConfig[]) => {
                return current.filter((p) => {
                    if (Array.isArray(p) && p[0] === dynamicRouter) {
                        logger.warn(
                            'Removing "@tdev-plugins/plugin-dynamic-routes" from config in ./siteConfig.ts.'
                        );
                        return false;
                    }
                    return true;
                });
            }
        }
    };
};

export default getSiteConfig;
