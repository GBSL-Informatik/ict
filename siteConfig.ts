// This file is never changed by teaching-dev.
// Use it to override or extend your app configuration.

import { SiteConfigProvider } from '@tdev/siteConfig/siteConfig';

const getSiteConfig: SiteConfigProvider = () => {
    return {
        title: 'ICT am Gymnasium Biel-Seeland',
        tagline: 'Anleitungen, Tipps und Tricks',
        url: 'https://ict-gbsl.netlify.app',
        baseUrl: '/',
        favicon: 'img/favicon.ico',
        organizationName: 'GBSL-Informatik',
        projectName: 'ict-v2'
    };
};

export default getSiteConfig;
