import path from 'path';
import fs from 'fs/promises'
import React from 'react';
import { Content } from '../../../../../common/contensts';
import { Col, Flex, Row, Typography } from 'antd';
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';

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
        <Flex justify='space-around' align='center' wrap>
            <Row gutter={[16, 16]} className='content'>
                {contents.map((content: Content) => {
                    return (content.cat_slug === cat_slug) && (content.subcat_slug == subcat_slug) ? (
                        <Col key={content.id} span={12}>
                            <Typography>
                                <Title level={4}>{content.title}</Title>
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