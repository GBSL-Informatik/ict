// This file is never changed by teaching-dev.
// Use it to override or extend your app configuration.

import { devModeAccessLocalFS, taskStateOverview } from './src/siteConfig/navbarItems';
import { SiteConfigProvider } from './src/siteConfig/siteConfig';
const GIT_COMMIT_SHA = process.env.GITHUB_SHA || Math.random().toString(36).substring(7);

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
        docs: {
            routeBasePath: '/'
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
        }
    };
};

export default getSiteConfig;
