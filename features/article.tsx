'use client';

import React from 'react';
import { Tabs, TabsProps, Typography } from 'antd';
import { Content } from '../common/contensts';

import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkBreaks from 'remark-breaks'
import rehypeMathjax from 'rehype-mathjax'
import styles from '../src/app/article.module.css';

const { Text } = Typography;

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
    ];

    // 内容物を確認
    if (!article) return null;
    return (
        <>
            <h4>{article.title}</h4>
            <Typography.Text type="secondary">
                model: <b>{article.model_name}</b>, created: <b>{formatDateTime(article.created_at)}</b>
            </Typography.Text>
            <Typography>
                <Tabs items={items} />
            </Typography>
        </>
    );
};

export default ArticleContent;