import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { Content } from '../../../../common/contensts';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const catSlug = searchParams.get('cat_slug');
    const subcatSlug = searchParams.get('subcat_slug');
    const id = searchParams.get('id');


    const filePath = path.join(process.cwd(), "src/data/contents.json");
    const jsonData = await fs.readFile(filePath, "utf8");
    const contents: Content[] = JSON.parse(jsonData);

    if (id) {
        const filtered = contents.filter((content: Content) => content.id == id);
        return NextResponse.json(filtered);
    } else if (catSlug && subcatSlug) {
        const filtered = contents.filter((content: Content) => content.cat_slug === catSlug && content.subcat_slug === subcatSlug);
        return NextResponse.json(filtered);
    } else if (catSlug) {
        const filtered = contents.filter((content: Content) => content.cat_slug === catSlug);
        return NextResponse.json(filtered);
    } else if (subcatSlug) {
        const filtered = contents.filter((content: Content) => content.subcat_slug === subcatSlug);
        return NextResponse.json(filtered);
    }

    // all contents
    return NextResponse.json(contents);
}