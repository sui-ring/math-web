import type { Metadata } from "next";
import React from 'react';
import Search from '../../../features/search';


const replace_subject_words = (slug: string) => {
    // "世界史" => "world",
    // "倫理" => "ethics",
    // "公共" => "public",
    // "公民" => "citizen",
    // "化学" => "chemistry",
    // "地理" => "geography",
    // "日本史" => "japan",
    // "物理" => "physics",
    // "理科" => "science",
    // "数学" => "math",
    // "生物" => "biology",
    // slug to Japanese
    switch (slug) {
        case 'world':
            return '世界史';
        case 'ethics':
            return '倫理';
        case 'public':
            return '公共';
        case 'citizen':
            return '公民';
        case 'chemistry':
            return '化学';
        case 'geography':
            return '地理';
        case 'japan':
            return '日本史';
        case 'physics':
            return '物理';
        case 'science':
            return '理科'
        case 'math':
            return '数学';
        case 'biology':
            return '生物';
        default:
            return slug;
    }
};

// 動的メタデータの生成
export async function generateMetadata(props: {
    params: Props
}): Promise<Metadata> {
    const { subject_slug } = await props.params;
    const word = replace_subject_words(subject_slug);

    return {
        title: `${word} 検索| [GeminiAI生成] 講義と漫才で学ぶ${word}`,
        description: `講義と漫才で学ぶ${word}です。当ページでは記事を網羅的に表示し、タイトル・記事内容から検索が可能です。`,
        openGraph: {
            title: `${word} 検索| [GeminiAI生成] 講義と漫才で学ぶ${word}`,
            description: `講義と漫才で学ぶ${word}です。当ページでは記事を網羅的に表示し、タイトル・記事内容から検索が可能です。`,
        }
    }
}

type Props = Promise<{ subject_slug: string; }>
const Page = async (props: {
    params: Props
}) => {
    const { subject_slug } = await props.params;

    return (
        <Search subject_slug={subject_slug} />
    );
}


export default Page;