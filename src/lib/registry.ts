import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

type RegistryIndex = {
  items?: Array<{
    name?: string;
  }>;
};

const ROOT = process.cwd();
const REGISTRY_INDEX_PATH = join(ROOT, 'registry.json');
const PUBLIC_REGISTRY_DIR = join(ROOT, 'public', 'r');

async function readRegistryIndex(): Promise<RegistryIndex> {
  const content = await readFile(REGISTRY_INDEX_PATH, 'utf8');
  return JSON.parse(content) as RegistryIndex;
}

export async function getAllPackageNames(): Promise<string[]> {
  const index = await readRegistryIndex();

  return (index.items ?? [])
    .map((item) => item.name)
    .filter((name): name is string => typeof name === 'string' && name.length > 0);
}

export async function getPackage(packageName: string): Promise<unknown> {
  const names = await getAllPackageNames();

  if (!names.includes(packageName)) {
    throw new Error(`Unknown package: ${packageName}`);
  }

  const packageJsonPath = join(PUBLIC_REGISTRY_DIR, `${packageName}.json`);
  const content = await readFile(packageJsonPath, 'utf8');

  return JSON.parse(content) as unknown;
}
