import { NextRequest, NextResponse } from 'next/server';
import { fetchHeadlines, fetchNewsList, fetchArticle, fetchRelated } from '@/services/news-service';
import type { NewsDomain } from '@/lib/types';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');
  const domain = searchParams.get('domain') as NewsDomain | null;
  const id = searchParams.get('id');
  const subTag = searchParams.get('subTag');
  const ids = searchParams.get('ids');

  try {
    if (type === 'headlines') {
      const data = await fetchHeadlines(domain || undefined);
      return NextResponse.json({ data });
    }
    if (type === 'list' && domain) {
      const data = await fetchNewsList(domain, subTag || undefined);
      return NextResponse.json({ data });
    }
    if (type === 'article' && id) {
      const data = await fetchArticle(id);
      if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      return NextResponse.json({ data });
    }
    if (type === 'related' && ids) {
      const data = await fetchRelated(ids.split(','));
      return NextResponse.json({ data });
    }
    return NextResponse.json({ error: 'Invalid params' }, { status: 400 });
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
