import * as fs from 'fs';

import * as yaml from 'js-yaml';
import path from 'path';
import { promisify } from 'util';
import { exec as execCallback, execSync } from 'child_process';

const rootPath = process.cwd();

type Config = {
    src: string;
    ignore?: string[];
};

const DOCS_DIR = path.resolve(path.join(rootPath, 'docs'));
const ONBOARDING_DIR = path.resolve(path.join(rootPath, 'versioned_docs', 'version-onboarding'));

const config = yaml.load(
    fs.readFileSync(path.resolve(rootPath, 'onboarding-sidebar.yml'), 'utf8')
) as Config[];
const exec = promisify(execCallback);

function createRsyncCommand({ src, ignore }: Config): string {
    const excludePatterns = ignore ? ignore.map((pattern) => `--exclude='${pattern}'`).join(' ') : '';

    return `rsync -av --delete ${excludePatterns} \
                ${path.join(DOCS_DIR, src)} \
                ${ONBOARDING_DIR} \
                --delete-after \
                --prune-empty-dirs`;
}

async function syncTrackedFiles() {
    for (const element of config) {
        const rsyncCommand = createRsyncCommand(element);

        try {
            await exec(rsyncCommand);
            console.log(`✅  Rsync command for tracked element ${element.src} completed successfully.`);
        } catch (error) {
            console.error('Error: Failed to execute rsync.');
            console.error(error);
            process.exit(1);
        }
    }
}

syncTrackedFiles();
