import path from 'path';
import fs from 'fs/promises'
import React from 'react';
import { Typography } from 'antd';
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';
import { Content } from '../../../../common/contensts';

const getContents = async (cat_slug: string) => {
    const filePath = path.join(process.cwd(), 'src/data/contents.json')
    const jsonData = await fs.readFile(filePath, 'utf8')
    const contents: Content[] = JSON.parse(jsonData)

    return contents.filter((content: Content) => content.cat_slug === cat_slug);
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
                cat_slug: content.cat_slug
            }
        }
    });
}

const Page = async ({ params }: {
    params: Promise<{ cat_slug: string; }>
}) => {
    const { cat_slug } = await params;
    const contents = await getContents(cat_slug);

    return (
        <div>
            Math page slug: {cat_slug}
            {contents.map((content: Content) => {
                return (content.cat_slug === cat_slug) ? (
                    <Typography key={content.id}>
                        <Title level={4}>{content.title}</Title>
                        <Paragraph>{content.content.substring(0, 140) + '...'}</Paragraph>
                    </Typography>
                ) : null;
            })}
        </div>
    );
}


export default Page;