import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { Content } from '../../../../common/contensts';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const catSlug = searchParams.get('cat_slug');
    const subcatSlug = searchParams.get('subcat_slug');


    const filePath = path.join(process.cwd(), "src/data/contents.json");
    const jsonData = await fs.readFile(filePath, "utf8");
    const contents: Content[] = JSON.parse(jsonData);

    if (catSlug && subcatSlug) {
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