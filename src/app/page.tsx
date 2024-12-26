import styles from "./page.module.css";
import { Content, Pair } from "../../common/contensts";
import { Col, Row, Space } from 'antd';
import Search from '../../features/search';
import Link from 'next/link';
import Paragraph from 'antd/es/typography/Paragraph';
// JSONモジュールの型定義
import contentData from '../data/contents.json';


export default async function Home() {
  const innerContents = contentData as Content[];

  // 静的リンク用
  const temp_patterns: Pair[] = [];
  const temp_subjects: Pair[] = []; // 科目区分
  innerContents.forEach((content: Content) => {
    // /cat_slug/subcat_slug
    if (content.cat_slug) {
      temp_patterns.push({ label: content.cat + content.subcat + content.subject, slug: "/" + content.subject_slug + "/" + content.cat_slug + "/" + content.subcat_slug });
    }
    // 科目区分
    if (content.subject_slug) {
      temp_subjects.push({ label: content.subject, slug: content.subject_slug });
    }
  });
  // remove duplicates
  const unique = (value: Pair, index: number, self: Pair[]) => self.findIndex((v) => v.slug === value.slug) === index;
  const patterns = temp_patterns.filter(unique);
  const subjects = temp_subjects.filter(unique);
  const contents = innerContents;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Row gutter={[16, 16]} className='content'>
          <Col>
            <Row gutter={[16, 16]}>
              <Col>
                <h4>科目区分</h4>
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
                <h4>小学区分</h4>
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
                <h4>中学区分</h4>
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
                <h4>高校区分</h4>
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
          <h4>記事一覧 （{contents.length}）</h4>
          <Search />
        </Row>
      </main >
      <footer className={styles.footer}>

      </footer>
    </div >
  );
}
