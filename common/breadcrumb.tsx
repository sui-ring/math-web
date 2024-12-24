'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { Breadcrumb } from 'antd';

const replaceWords = (slug: string) => {
  switch (slug) {
    case 'math':
      return '数学';
    case 'el':
      return '小学校';
    case 'md':
      return '中学校';
    case 'hi':
      return '高校';
    // 科目
    case 'world':
      return '世界史';
    case 'ethics':
      return '倫理';
    case 'public':
      return '公共';
    case 'citizen':
      return '公民';
    case 'chemistry':
      return '化学';
    case 'geography':
      return '地理';
    case 'japan':
      return '日本史';
    case 'physics':
      return '物理';
    case 'science':
      return '理科'
    case 'math':
      return '数学';
    case 'biology':
      return '生物';
    case '1':
      return '一年';
    case '2':
      return '二年';
    case '3':
      return '三年';
    case '4':
      return '四年';
    case '5':
      return '五年';
    case '6':
      return '六年';
    default:
      return slug;
  }
}

const BreadcrumbNav = () => {
  const pathname = usePathname();

  const paths = pathname.split('/').filter(path => path);

  const breadcrumbItems = [
    { title: <Link href="/">ホーム</Link> },
    ...paths.map((path, index) => {
      const href = `/${paths.slice(0, index + 1).join('/')}`;
      return {
        title: <Link href={href}>{replaceWords(decodeURIComponent(path))}</Link>
      };
    })
  ];

  return (
    <Breadcrumb items={breadcrumbItems} separator={'> '} style={{ padding: '1rem 2rem' }} />
  );
}

export default BreadcrumbNav;