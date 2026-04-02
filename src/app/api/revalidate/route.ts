import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const slug: string | undefined = body?.post?.slug || body?.slug;

    revalidatePath('/');
    revalidatePath('/noticias');

    if (slug) {
      revalidatePath(`/noticias/${slug}`);
    }

    revalidatePath('/categoria/[slug]', 'page');
    revalidatePath('/autor/[slug]', 'page');

    console.log(`[Revalidate] ${new Date().toISOString()} — slug: ${slug || 'all'}`);

    return NextResponse.json({
      revalidated: true,
      slug: slug || null,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json({ error: 'Revalidation failed', detail: String(err) }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }

  revalidatePath('/');
  revalidatePath('/noticias');
  revalidatePath('/categoria/[slug]', 'page');

  return NextResponse.json({ revalidated: true, timestamp: new Date().toISOString() });
}
