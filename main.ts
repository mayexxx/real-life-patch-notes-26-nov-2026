import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const outputDir = resolve(scriptDir, process.env.MAKEFUN_OUTPUT_DIR || '/output');
const entry = 'v2026.11.25: Fixed a bug where Mondays loaded twice. Nerfed the snooze button. Added 3 seconds of motivation (experimental, may crash).';

await mkdir(outputDir, { recursive: true });
await writeFile(resolve(outputDir, 'entry.txt'), entry, 'utf8');

const written = await readFile(resolve(outputDir, 'entry.txt'), 'utf8');
if (written.length !== 135 || /[\r\n]/.test(written) || written !== entry) {
  throw new Error(`Invalid entry.txt content: ${JSON.stringify(written)}`);
}
