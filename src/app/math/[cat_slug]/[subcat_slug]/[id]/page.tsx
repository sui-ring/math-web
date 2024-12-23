import React, { cache } from 'react';
import path from 'path';
import fs from 'fs/promises';

import { Content } from '../../../../../../common/contensts';
import ArticleContent from '../../../../../../features/article';
import { Metadata } from 'next';
import getBaseUrl from '../../../../../../common/url';

const getMetadata = cache(async (id: string) => {
    const queryParams = new URLSearchParams();
    if (id) queryParams.append('id', id);
    const res = await fetch(`${getBaseUrl()}/api/contents?${queryParams.toString()}`);
    const data = await res.json() as Content[];
    return data[0];
});

// 動的メタデータの生成
export async function generateMetadata(props: { params: Props }): Promise<Metadata> {
    const { id } = await props.params;

    if (!id) {
        throw new Error('Content not found');
    }

    const content = await getMetadata(id);

    return {
        title: `${content.title} | [GeminiAI生成] 講義と漫才で学ぶ算数数学`,
        description: '講義と漫才で学ぶ算数数学です。当ページでは記事を網羅的に表示し、タイトル・記事内容から検索が可能です。',
        openGraph: {
            title: `${content.title} | [GeminiAI生成] 講義と漫才で学ぶ算数数学`,
            description: '講義と漫才で学ぶ算数数学です。当ページでは記事を網羅的に表示し、タイトル・記事内容から検索が可能です。',
        }
    }
}

async function getContent(props: { params: Props }): Promise<Content> {
    const { id } = await props.params;
    const filePath = path.join(process.cwd(), 'src/data/contents.json')
    const jsonData = await fs.readFile(filePath, 'utf8')
    const contents: Content[] = JSON.parse(jsonData)

    // 一つを取得
    const content = contents.find((content: Content) => {
        return content.id == id;
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

    const result = contents.map((content: Content) => {
        return {
            params: {
                cat_slug: content.cat_slug,
                subcat_slug: content.subcat_slug,
                id: content.id,
            }
        };
    });

    return result;
}

type Props = Promise<{ cat_slug: string; subcat_slug: string; id: string; }>

const Page = async (props: { params: Props }) => {
    const article = await getContent(props);

    return (
        <>
            <div className='content'>
                <ArticleContent article={article} />
            </div>
        </>
    );
}


export default Page;