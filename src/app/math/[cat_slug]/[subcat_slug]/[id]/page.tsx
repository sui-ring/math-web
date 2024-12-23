import React from 'react';
import path from 'path';
import fs from 'fs/promises';

import { Content } from '../../../../../../common/contensts';
import ArticleContent from '../../../../../../features/article';

async function getContent(params: { cat_slug: string; subcat_slug: string; id: string }): Promise<Content> {
    const filePath = path.join(process.cwd(), 'src/data/contents.json')
    const jsonData = await fs.readFile(filePath, 'utf8')
    const contents: Content[] = JSON.parse(jsonData)

    // 一つを取得
    const content = contents.find((content: Content) => {
        return content.id == params.id;
    });

    if (!content) {
        throw new Error('Content not found');
    }

    return content;
}

// Generate static params for all possible paths
export async function generateStaticParams() {
    // file read
    const filePath = path.join(process.cwd(), 'src/data/contents.json')
    const jsonData = await fs.readFile(filePath, 'utf8')
    const contents: Content[] = JSON.parse(jsonData)

    // length of contents
    console.log(contents.length)

    return contents.map((content: Content) => {
        return {
            params: {
                id: content.id,
                cat_slug: content.cat_slug,
                subcat_slug: content.subcat_slug,
            }
        }
    });
}

const Page = async ({ params }: {
    params: Promise<{ cat_slug: string; subcat_slug: string; id: string; }>
}) => {
    const { cat_slug, subcat_slug, id } = await params;
    const article = await getContent({ cat_slug, subcat_slug, id });

    return (
        <>
            <div className='content'>
                <ArticleContent article={article} />
            </div>
        </>
    );
}


export default Page;