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
    default:
      return slug;
  }
}

const BreadcrumbNav = () => {
  const pathname = usePathname();
  console.log(pathname);

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
    <Breadcrumb items={breadcrumbItems} separator={'>> '} style={{ padding: '1rem 2rem' }} />
  );
}

export default BreadcrumbNav;