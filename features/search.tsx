'use client';
import { useEffect, useState } from "react"
import { Input, Col, Flex, Row, Spin } from 'antd';
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';
import { Content } from "../common/contensts";
import Link from "next/link";

import debounce from 'lodash/debounce';

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
    const [loading, setLoading] = useState(true);
    const [contents, setContents] = useState<Content[]>([]);
    const [results, setResults] = useState<Content[]>([]);

    useEffect(() => {
        getContents(subject_slug).then((data) => {
            setContents(data);
            setResults(data);
        })
    }, []);

    useEffect(() => {
        if (results.length === 0) {
            setLoading(true);
            return;
        };
        setLoading(false);
    }, [results]);

    const [search, setSearch] = useState('');
    useEffect(() => {
        const debouncedSearch = debounce(async () => {
            if (!search) {
                if (results.length != contents.length) {
                    setResults(contents);
                }
                return;
            } else if (search.length < 3) {
                return;
            }

            // 検索処理
            const temp_results = contents.filter(item => {
                if (!item) return false;
                return item.content.includes(search) || item.title.includes(search);
            });
            setResults(temp_results);
        }, 500); // 500ms後に実行

        debouncedSearch();
        return () => debouncedSearch.cancel();
    }, [search]);

    return (
        <>
            <Input onChange={(e) => {
                setSearch(e.target.value);
            }} />
            <Spin spinning={loading}>
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
            </Spin>
        </>
    );
}

export default Search;