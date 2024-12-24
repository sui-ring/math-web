import { NextRequest, NextResponse } from 'next/server';
import { Content } from '../../../../common/contensts';
import read_contents from '../../../../common/read';

let cachedContents: Content[] | null = null;

export async function GET(request: NextRequest) {
    if (!cachedContents) {
        cachedContents = await read_contents();
    }

    const searchParams = request.nextUrl.searchParams;
    const subjectSlug = searchParams.get('subject_slug');
    const catSlug = searchParams.get('cat_slug');
    const subcatSlug = searchParams.get('subcat_slug');
    const id = searchParams.get('id');

    let filtered = cachedContents;

    if (id) {
        filtered = cachedContents.filter((content) => content.id === id);
    } else if (subjectSlug) {
        filtered = cachedContents.filter(
            (content) => content.subject_slug === subjectSlug
        );
    } else if (catSlug && subcatSlug) {
        filtered = cachedContents.filter(
            (content) => content.cat_slug === catSlug && content.subcat_slug === subcatSlug
        );
    } else if (catSlug) {
        filtered = cachedContents.filter((content) => content.cat_slug === catSlug);
    } else if (subcatSlug) {
        filtered = cachedContents.filter((content) => content.subcat_slug === subcatSlug);
    }

    return NextResponse.json(filtered);
}