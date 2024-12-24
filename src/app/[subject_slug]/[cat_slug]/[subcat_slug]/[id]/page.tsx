import React from 'react';

import { Content } from '../../../../../../common/contensts';
import ArticleContent from '../../../../../../features/article';
import { Metadata } from 'next';
import read_contents from '../../../../../../common/read';

// 動的メタデータの生成
export async function generateMetadata(props: { params: Props }): Promise<Metadata> {
    const { id } = await props.params;

    if (!id) {
        throw new Error('Content not found');
    }

    const contents = await read_contents();
    const content = contents.find((content: Content) => content.id == id) ?? { title: 'Content not found' };

    return {
        title: `${content.title} | [GeminiAI生成] 講義と漫才で学ぶ算数数学`,
        description: '講義と漫才で学ぶ算数数学です。当ページでは記事を網羅的に表示し、タイトル・記事内容から検索が可能です。',
        openGraph: {
            title: `${content.title} | [GeminiAI生成] 講義と漫才で学ぶ算数数学`,
            description: '講義と漫才で学ぶ算数数学です。当ページでは記事を網羅的に表示し、タイトル・記事内容から検索が可能です。',
        }
    }
}

const getContent = async (props: { params: Props }) => {
    const { id } = await props.params;
    const res = await read_contents();

    // cat_slugでフィルタリング
    const contents = res.filter((content: Content) => content.id == id);


    return contents[0];
}

// Generate static params for all possible paths
export async function generateStaticParams() {
    const contents = await read_contents();

    const result = contents.map((content: Content) => {
        return {
            params: {
                subject_slug: content.subject_slug,
                cat_slug: content.cat_slug,
                subcat_slug: content.subcat_slug,
                id: content.id,
            }
        };
    });

    return result;
}

type Props = Promise<{ subject_slug: string, cat_slug: string; subcat_slug: string; id: string; }>

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