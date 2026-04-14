import { track } from '@vercel/analytics/server';
import { notFound } from 'next/navigation';
import { NextResponse, type NextRequest } from 'next/server';
import { getAllPackageNames, getPackage } from '@/lib/registry';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: NextRequest,
  { params }: RouteContext<'/r/[component]'>,
) {
  const { component } = await params;

  if (!component.endsWith('.json')) {
    return NextResponse.json(
      { error: 'Component must end with .json' },
      { status: 400 },
    );
  }

  const packageName = component.replace(/\.json$/, '');

  if (process.env.NODE_ENV === 'production') {
    try {
      await track('Registry download', { component: packageName });
    } catch (error) {
      console.error(error);
    }
  }

  try {
    const pkg = await getPackage(packageName);
    return NextResponse.json(pkg);
  } catch (error) {
    console.error(error);
    notFound();
  }
}

export async function generateStaticParams() {
  const packageNames = await getAllPackageNames();
  return packageNames.map((name) => ({ component: `${name}.json` }));
}
