'use client';
import { useState, useEffect } from 'react';
import styles from "./page.module.css";
import { Content, Pair } from "../../common/contensts";
import { Col, Row, Spin } from 'antd';
import Title from 'antd/es/typography/Title';

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [contents, setContents] = useState<Content[]>([]);
  // コンテンツからカテゴリのリンクを生成する
  const [cats, setCats] = useState<Pair[]>([]);
  const [patterns, setPatterns] = useState<Pair[]>([]);


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
        const cats: Pair[] = [];
        const patterns: Pair[] = [];
        data.forEach((content: Content) => {
          if (content.cat_slug) {
            cats.push({ label: content.cat, slug: content.cat_slug });
          }
          // /cat_slug/subcat_slug
          if (content.cat_slug && content.subcat_slug) {
            patterns.push({ label: content.cat + content.subcat, slug: content.cat_slug + "/" + content.subcat_slug });
          }
        });
        setPatterns(patterns.filter(unique));
        setCats(cats.filter(unique));


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
          <Row gutter={[16, 16]} style={{ padding: '2rem' }}>
            <Col span={6}>
              <Title level={4}>学習要項: 範囲区分</Title>
              <ul>
                {cats.map((v: Pair) => (
                  <li key={v.slug}>
                    <a href={`math/${v.slug}`}>{v.label}</a>
                  </li>
                ))}
              </ul>
            </Col>
            <Col span={6}>
              <Title level={3}>小学区分</Title>
              <ul>
                {/* cat_slug==elのみ */}
                {patterns
                  .filter((v: Pair) => v.slug.startsWith("el"))
                  .map((v: Pair) => (
                    <li key={v.slug}>
                      <a href={`math/${v.slug}`}>{v.label}</a>
                    </li>
                  ))}
              </ul>
            </Col>
            <Col span={6}>
              <Title level={3}>中学区分</Title>
              <ul>
                {/* cat_slug==elのみ */}
                {patterns
                  .filter((v: Pair) => v.slug.startsWith("md"))
                  .map((v: Pair) => (
                    <li key={v.slug}>
                      <a href={`math/${v.slug}`}>{v.label}</a>
                    </li>
                  ))}
              </ul>
            </Col>
            <Col span={6}>
              <Title level={3}>高校区分</Title>
              <ul>
                {/* cat_slug==elのみ */}
                {patterns
                  .filter((v: Pair) => v.slug.startsWith("hi"))
                  .map((v: Pair) => (
                    <li key={v.slug}>
                      <a href={`math/${v.slug}`}>{v.label}</a>
                    </li>
                  ))}
              </ul>
            </Col>
          </Row>

          <Row>
            <Col>
              <Title level={4}>記事一覧 （{contents.length}）</Title>
              <ul>
                {
                  contents.map((content: Content) => (
                    <li key={content.id}>
                      <a href={`math/${content.cat_slug}/${content.subcat_slug}/${content.id}`}>{content.title}
                        {/* laugh_contentがあるならば */}
                        {content.laugh_content && <span style={{ color: 'red' }}>🤣</span>}
                      </a>
                    </li>
                  ))
                }
              </ul>
            </Col>
          </Row>
        </Spin>
      </main>
      <footer className={styles.footer}>

      </footer>
    </div >
  );
}
