import * as fs from 'fs';
import * as yaml from 'js-yaml';
import path from 'path';
import { promisify } from 'util';
import { exec as execCallback } from 'child_process';
import { Config } from './sync-onboarding';

const rootPath = process.cwd();

const ONBOARDING_DIR = path.resolve(path.join(rootPath, 'versioned_docs', 'version-onboarding'));

const config = yaml.load(
    fs.readFileSync(path.resolve(rootPath, 'onboarding-sidebar.yml'), 'utf8')
) as Config[];
const exec = promisify(execCallback);

function createRmCommand({ src, dst }: Config): string {
    return `rm -rf ${path.join(ONBOARDING_DIR, dst ?? src)}`;
}

async function syncTrackedFiles() {
    for (const element of config) {
        const rmCommand = createRmCommand(element);

        try {
            await exec(rmCommand);
            console.log(`☢️♻️ cleaned ${element.src} from onboarding.`);
        } catch (error) {
            console.error('Error: Failed to execute rm.');
            console.error(error);
            process.exit(1);
        }
    }
}

syncTrackedFiles();
