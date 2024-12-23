import React from 'react';
import { Col, Flex, Row, Typography } from 'antd';
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';
import { Content, switch_slug_to_label } from '../../../../common/contensts';
import { Metadata } from 'next';
import Link from 'next/link';
import read_contents from '../../../../common/read';

// 動的メタデータの生成
export async function generateMetadata(props: { params: Props }): Promise<Metadata> {
    const { cat_slug } = await props.params;

    const title = switch_slug_to_label(cat_slug, '');

    return {
        title: `${title} | [GeminiAI生成] 講義と漫才で学ぶ算数数学`,
        description: '講義と漫才で学ぶ算数数学です。当ページでは記事を網羅的に表示し、タイトル・記事内容から検索が可能です。',
        openGraph: {
            title: `${title} | [GeminiAI生成] 講義と漫才で学ぶ算数数学`,
            description: '講義と漫才で学ぶ算数数学です。当ページでは記事を網羅的に表示し、タイトル・記事内容から検索が可能です。',
        }
    }
}

const getContents = async (props: { params: Props }) => {
    const { cat_slug } = await props.params;
    const contents = await read_contents();
    // cat_slugでフィルタリング
    return contents.filter((content: Content) => content.cat_slug === cat_slug);
}

// Generate static params for all possible paths
export async function generateStaticParams() {
    const contents = await read_contents();

    return contents.map((content: Content) => {
        return {
            params: {
                cat_slug: content.cat_slug
            }
        }
    });
}

type Props = Promise<{ cat_slug: string; }>

const Page = async (props: {
    params: Props
}) => {
    const { cat_slug } = await props.params;
    const contents = await getContents(props);

    return (
        <Flex justify='space-around' align='center' wrap>
            <Row gutter={[16, 16]} className='content'>
                {contents.map((content: Content) => {
                    return (content.cat_slug === cat_slug) ? (
                        <Col key={content.id} span={12}>
                            <Typography>
                                <Link href={`/math/${content.cat_slug}/${content.subcat_slug}/${content.id}`}><Title level={4}>{content.title}</Title></Link>
                                <Paragraph>{content.content.substring(0, 140) + '...'}</Paragraph>
                            </Typography>
                        </Col>
                    ) : null;
                })}
            </Row>
        </Flex>
    );
}


export default Page;