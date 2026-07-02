import { visit } from 'unist-util-visit';
import type { Plugin, Transformer } from 'unified';
import { Root, Text } from 'mdast';
import * as yaml from 'js-yaml';
import * as fs from 'fs/promises';
import path from 'path';

interface OptionsInput {
    mapping: Record<string, string>;
    mappingFilePath?: string;
}

const links = new Map<string, string>();
let lastModifiedTime = 0;

const loadMapping = async (mappingFilePath?: string) => {
    if (!mappingFilePath) {
        return;
    }
    // get time of last modification of the mapping file
    const stats = await fs.stat(mappingFilePath).catch((err) => {
        return { mtimeMs: 0 };
    });
    const lastModified = stats.mtimeMs;

    if (lastModified <= lastModifiedTime) {
        return;
    }
    if (lastModified > lastModifiedTime) {
        lastModifiedTime = lastModified;
        const fileContent = await fs.readFile(mappingFilePath, 'utf8').catch((err) => {
            console.error(`Error reading mapping file at ${mappingFilePath}:`, err);
            return '';
        });
        const mapping = yaml.load(fileContent) as Record<string, string>;
        // don't clear the links map, instead just update it with new values
        // links.clear();
        for (const [key, value] of Object.entries(mapping)) {
            links.set(key, value);
        }
    }
};

const plugin: Plugin<OptionsInput[], Root> = function plugin(
    optionsInput = { mapping: {} }
): Transformer<Root> {
    for (const [key, value] of Object.entries(optionsInput.mapping ?? {})) {
        links.set(key, value);
    }

    return async (tree) => {
        await loadMapping(optionsInput.mappingFilePath);
        visit(tree, 'link', (node) => {
            if (!node.url.startsWith('@')) {
                return;
            }
            const translationKey = node.url.slice(1);
            if (!links.has(translationKey)) {
                return;
            }
            node.url = links.get(translationKey) ?? node.url;
        });
    };
};

export default plugin;
