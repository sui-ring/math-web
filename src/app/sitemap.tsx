import { MetadataRoute } from 'next'
import read_contents from '../../common/read'
import getBaseUrl from '../../common/url'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // ベースURLを取得
    const baseUrl = getBaseUrl()

    // コンテンツを取得
    const contents = await read_contents()

    // sitemap格納用型配列
    const sitemap: MetadataRoute.Sitemap = []

    // 静的ページ情報をまとめる
    const staticPages: {
        url: string;
        lastModified: string;
        changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
        priority: number;
    }[] = [
            {
                url: '/',
                lastModified: new Date().toISOString(),
                changeFrequency: 'monthly',
                priority: 0.8
            },
            {
                url: '/about',
                lastModified: new Date().toISOString(),
                changeFrequency: 'monthly',
                priority: 0.2
            },
            {
                url: '/poricy',
                lastModified: new Date().toISOString(),
                changeFrequency: 'monthly',
                priority: 0.2
            }
        ]


    staticPages.forEach(page => {
        sitemap.push({
            url: `${baseUrl}${page.url}`,
            lastModified: page.lastModified,
            changeFrequency: page.changeFrequency,
            priority: page.priority
        })
    })

    // slug情報を追記する
    const slug_strs = contents.map(content => {
        return `${baseUrl}/${content.subcat_slug}/${content.cat_slug}/${content.subcat_slug}`
    })

    // 重複を削除
    const slug_set = new Set(slug_strs)
    slug_set.forEach(slug => {
        sitemap.push({
            url: slug,
            lastModified: new Date().toISOString(),
            changeFrequency: 'daily',
            priority: 0.8
        })
    })

    // コンテンツ情報を追記する
    contents.forEach(content => {
        sitemap.push({
            url: `${baseUrl}/${content.subcat_slug}/${content.cat_slug}/${content.subcat_slug}/${content.id}`,
            lastModified: content.updated_at,
            changeFrequency: 'daily',
            priority: 0.5
        })
    })


    return sitemap
}