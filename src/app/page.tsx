'use client';
import { useState, useEffect } from 'react';
import styles from "./page.module.css";
import { Content, Pair } from "../../common/contensts";
import { Col, Row, Space, Spin, Typography } from 'antd';
const { Title } = Typography;
import Search from '../../features/search';
import Link from 'next/link';
import Paragraph from 'antd/es/typography/Paragraph';

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [contents, setContents] = useState<Content[]>([]);
  // コンテンツからカテゴリのリンクを生成する
  const [patterns, setPatterns] = useState<Pair[]>([]);
  // 科目区分
  const [subjects, setSubjects] = useState<Pair[]>([]);


  useEffect(() => {
    // remove duplicates
    const unique = (value: Pair, index: number, self: Pair[]) => self.findIndex((v) => v.slug === value.slug) === index;
    const fetchContents = async (catSlug?: string) => {
      try {
        const url = catSlug
          ? `/api/contents?cat_slug=${catSlug}`
          : '/api/contents';
        const response = await fetch(url);
        const data = await response.json();
        setContents(data);

        // create Pair[] from contents
        const temp_patterns: Pair[] = [];
        const temp_subjects: Pair[] = []; // 科目区分
        data.forEach((content: Content) => {
          // /cat_slug/subcat_slug
          if (content.cat_slug) {
            temp_patterns.push({ label: content.cat + content.subcat + content.subject, slug: "/" + content.subject_slug + "/" + content.cat_slug + "/" + content.subcat_slug });
          }
          // 科目区分
          if (content.subject_slug) {
            temp_subjects.push({ label: content.subject, slug: content.subject_slug });
          }
        });
        setPatterns(temp_patterns.filter(unique));
        setSubjects(temp_subjects.filter(unique));

      } catch (error) {
        console.error('Failed to fetch contents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContents();
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Spin spinning={loading}>
          <Row gutter={[16, 16]} className='content'>
            <Col>
              <Row gutter={[16, 16]}>
                <Col>
                  <Title level={3}>科目区分</Title>
                  <Row>
                    <Paragraph>
                      {/* cat_slug==elのみ */}
                      <Space>
                        {subjects
                          .map((v: Pair) => (
                            <Link key={v.slug} href={`/${v.slug}`}>{v.label}</Link>
                          ))}
                      </Space>
                    </Paragraph>
                  </Row>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col>
                  <Title level={3}>小学区分</Title>
                  <Paragraph>
                    {/* cat_slug==elのみ */}
                    <Space wrap>
                      {patterns
                        .filter((v: Pair) => v.slug.includes("el"))
                        .map((v: Pair) => (
                          <Link key={v.slug} href={`${v.slug}`}>{v.label}</Link>
                        ))}
                    </Space>
                  </Paragraph>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col>
                  <Title level={3}>中学区分</Title>
                  <Paragraph>
                    {/* cat_slug==elのみ */}
                    <Space wrap>
                      {patterns
                        .filter((v: Pair) => v.slug.includes("md"))
                        .map((v: Pair) => (
                          <Link key={v.slug} href={`${v.slug}`}>{v.label}</Link>
                        ))}
                    </Space>
                  </Paragraph>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col>
                  <Title level={3}>高校区分</Title>
                  <Paragraph>
                    {/* cat_slug==elのみ */}
                    <Space wrap>
                      {patterns
                        .filter((v: Pair) => v.slug.includes("hi"))
                        .map((v: Pair) => (
                          <Link key={v.slug} href={`${v.slug}`}>{v.label}</Link>
                        ))}
                    </Space>
                  </Paragraph>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row>
            <Title level={4}>記事一覧 （{contents.length}）</Title>
            <Search />
          </Row>
        </Spin>
      </main >
      <footer className={styles.footer}>

      </footer>
    </div >
  );
}
