'use client';
import { use, useEffect, useRef, useState } from "react"
import { Input, Col, Flex, Row, Typography } from 'antd';
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';
import { Content } from "../common/contensts";
import Link from "next/link";

const getContents = async (subject_slug?: string): Promise<Content[]> => {
    try {
        const url = (subject_slug) ? '/api/contents?subject_slug=' + subject_slug : '/api/contents';
        const result = await fetch(url);
        const data: Content[] = await result.json()

        return data;
    } catch (error) {
        console.error('Failed to fetch contents:', error);
        return [];
    }
}

const Search = (
    { subject_slug }: { subject_slug?: string }
) => {
    const word = useRef('');
    const [contents, setContents] = useState<Content[]>([]);
    const [results, setResults] = useState<Content[]>([]);

    useEffect(() => {
        getContents(subject_slug).then((data) => {
            setContents(data);
            setResults(data);
        })
    }, []);

    const onChange = (e: any) => {
        word.current = e.target.value;
        // filter contents
        const filteredContents = contents.filter((content: Content) => {
            return content.title.includes(word.current) || content.content.includes(word.current);
        });

        if (filteredContents.length === 0) {
            setResults(contents);
            return;
        }
        setResults(filteredContents);
    }


    return (
        <>
            <Input onChange={onChange} />
            <Flex justify='space-around' align='center' wrap>
                <Row gutter={[16, 16]} className='content'>
                    {results.map((content: Content) => {
                        return (
                            <Col key={content.id} span={12}>
                                <Link href={`/${content.subject_slug}/${content.cat_slug}/${content.subcat_slug}/${content.id}`}>
                                    <Title level={4}>{content.title}</Title>
                                    <Paragraph>{content.content.substring(0, 140) + '...'}</Paragraph>
                                </Link>
                            </Col>
                        )
                    })}
                </Row>
            </Flex>
        </>
    );
}

export default Search;