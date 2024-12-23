import type { Metadata } from "next";
import React from 'react';
import Search from '../../../features/search';

// 動的メタデータの生成
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `検索| [GeminiAI生成] 講義と漫才で学ぶ算数数学`,
        description: '講義と漫才で学ぶ算数数学です。当ページでは記事を網羅的に表示し、タイトル・記事内容から検索が可能です。',
        openGraph: {
            title: `検索| [GeminiAI生成] 講義と漫才で学ぶ算数数学`,
            description: '講義と漫才で学ぶ算数数学です。当ページでは記事を網羅的に表示し、タイトル・記事内容から検索が可能です。',
        }
    }
}

const Page = async () => {
    return (
        <Search />
    );
}


export default Page;