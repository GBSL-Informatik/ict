import { remark } from 'remark';
import remarkMdx from 'remark-mdx';
import remarkDirective from 'remark-directive';
import { describe, expect, it } from 'vitest';

const process = async (content: string, mapping: Record<string, string> = {}) => {
    const { default: plugin } = await import('..');
    const result = await remark()
        .use(remarkMdx)
        .use(remarkDirective)
        .use(plugin, { mapping })
        .process(content);

    return result.value;
};

describe('#link annotation', () => {
    it("does nothing if there's no link", async () => {
        const input = `# Heading

Some content
`;
        const result = await process(input);
        expect(result).toBe(input);
    });
    it('can map links', async () => {
        const input = `# Details element example
        Hello [example](@translation-key) world!
        `;
        const result = await process(input, { ['translation-key']: 'https://example.org' });
        expect(result).toMatchInlineSnapshot(`
          "# Details element example

          Hello [example](https://example.org) world!
          "
        `);
    });
});
