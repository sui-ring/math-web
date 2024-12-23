import path from 'path';
import fs from 'fs/promises'
import React from 'react';
import { Content } from '../../../../../common/contensts';

const getContents = async (cat_slug: string, subcat_slug: string) => {
    const filePath = path.join(process.cwd(), 'src/data/contents.json')
    const jsonData = await fs.readFile(filePath, 'utf8')
    const contents: Content[] = JSON.parse(jsonData)

    return contents.filter((content: Content) => content.cat_slug === cat_slug && content.subcat_slug === subcat_slug);
}


// Generate static params for all possible paths
export async function generateStaticParams() {
    // file read
    const filePath = path.join(process.cwd(), 'src/data/contents.json')
    const jsonData = await fs.readFile(filePath, 'utf8')
    const contents: Content[] = JSON.parse(jsonData)

    return contents.map((content: Content) => {
        return {
            params: {
                cat_slug: content.cat_slug,
                subcat_slug: content.subcat_slug
            }
        }
    });
}

const Page = async ({ params }: {
    params: Promise<{ cat_slug: string; subcat_slug: string; }>
}) => {
    const { cat_slug, subcat_slug } = await params;
    const contents = await getContents(cat_slug, subcat_slug);

    return (
        <div>
            Math page slug: {cat_slug}, {subcat_slug}
            {contents.map((content: Content) => {
                return (content.cat_slug === cat_slug) && (content.subcat_slug == subcat_slug) ? (
                    <div key={content.id}>
                        <h1>{content.title}</h1>
                        <p>{content.content.substring(0, 140) + '...'}</p>
                    </div>
                ) : null;
            })}
        </div>
    );
}


export default Page;