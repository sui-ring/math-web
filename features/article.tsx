'use client';

import React from 'react';
import { Col, Flex, Row, Tabs, TabsProps, Typography } from 'antd';
import { Content } from '../common/contensts';

import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkBreaks from 'remark-breaks'
import rehypeMathjax from 'rehype-mathjax'
import styles from '../src/app/article.module.css';
import Link from 'next/link';

const { Text } = Typography;

const N = 6;

const formatDateTime = (utcString: string) => {
    const date = new Date(utcString);
    return date.toLocaleString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
};

const CustomComponents = {
    strong: ({ node, children, ...props }: any) => {
        return <Text mark {...props}>{children}</Text>;
    }
};

// content.video_urlsをリスト表示
const VideoList = ({ n, video_urls }: { n: number, video_urls: string[] }) => {
    // 配列長をlimitにnこの配列をランダムに選択
    const length = video_urls.length;
    // length内でn個のランダムかつ重複のない整数を生成
    const uniqueIndices = new Set<number>();
    while (uniqueIndices.size < Math.min(n, length)) {
        uniqueIndices.add(Math.floor(Math.random() * length));
    }

    return (

        <Row gutter={[16, 16]} wrap>
            <Flex wrap align="center" justify="center">
                {Array.from(uniqueIndices).map((index: number) => {
                    return (
                        <Col key={index} span={12}>
                            <iframe
                                width="100%"
                                height="315"
                                src={`https://www.youtube.com/embed/${video_urls[index]}`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            ></iframe>
                        </Col>
                    )
                })}
            </Flex>
        </Row>
    );
};

const ArticleContent: React.FC<{ article: Content }> = ({ article }) => {
    const items: TabsProps['items'] = [
        {
            key: 'content',
            label: '講義形式',
            children: (
                <ReactMarkdown
                    className={styles.markdown}
                    remarkPlugins={[remarkParse, remarkBreaks, remarkMath, remarkGfm]}
                    rehypePlugins={[rehypeMathjax]}
                    components={CustomComponents}
                >
                    {article.content}
                </ReactMarkdown>
            ),
        },
        {
            key: 'laugh_content',
            label: '漫才形式',
            children: (
                <ReactMarkdown
                    className={styles.markdown}
                    remarkPlugins={[remarkParse, remarkBreaks, remarkMath, remarkGfm]}
                    rehypePlugins={[rehypeMathjax]}
                    components={CustomComponents}
                >
                    {article.laugh_content}
                </ReactMarkdown>
            ),
        },
        {
            key: 'videos',
            label: '関連動画',
            children: (
                VideoList({ n: N, video_urls: article.video_urls ? article.video_urls : [] })
            ),
        },
    ];

    // 内容物を確認
    if (!article) return null;
    return (
        <>
            <h4>{article.title}</h4>
            <Typography.Text type="secondary">
                model: <b>{article.model_name}</b>, created: <b>{
                    (article.updated_at) ? formatDateTime(article.updated_at) : formatDateTime(article.created_at)
                }</b>
            </Typography.Text>
            <Typography>
                <Tabs items={items} />
            </Typography>
        </>
    );
};

export default ArticleContent;