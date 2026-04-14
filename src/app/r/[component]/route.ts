import { notFound } from 'next/navigation';
import { type NextRequest, NextResponse } from 'next/server';
import { getAllPackageNames, getPackage } from '@/lib/package';
import { recordRegistryDownload } from '@/lib/upstash-redis';

interface RegistryParams {
  params: Promise<{ component: string }>;
}

export const GET = async (_: NextRequest, { params }: RegistryParams) => {
  const { component } = await params;

  if (!component.endsWith('.json')) {
    return NextResponse.json(
      { error: 'Component must end with .json' },
      { status: 400 },
    );
  }

  const packageName = component.replace('.json', '');

  try {
    const pkg = await getPackage(packageName);
    await recordRegistryDownload(packageName);
    return NextResponse.json(pkg);
  } catch (error) {
    console.error(error);
    notFound();
  }
};

export const generateStaticParams = async () => {
  const packageNames = await getAllPackageNames();

  return packageNames.map((name: string) => ({ component: `${name}.json` }));
};
