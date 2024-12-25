import { MetadataRoute } from 'next'
import read_contents from '../../common/read'
import getBaseUrl from '../../common/url'
import { Languages } from 'next/dist/lib/metadata/types/alternative-urls-types'
import { Videos } from 'next/dist/lib/metadata/types/metadata-types'

interface SitemapRow {
    url: string;
    lastModified?: string | Date | undefined;
    changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never" | undefined;
    priority?: number | undefined;
    alternates?: {
        languages?: Languages<string> | undefined;
    } | undefined;
    images?: string[] | undefined;
    videos?: Videos[] | undefined;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date()

    // ベースURLを取得
    const baseUrl = getBaseUrl()

    // コンテンツを取得
    const contents = await read_contents()

    // sitemap格納用型配列
    const sitemap: MetadataRoute.Sitemap = []

    // 静的ページ情報をまとめる
    const staticPages: SitemapRow[] = [
        {
            url: '/',
            lastModified: now,
            changeFrequency: 'daily',
            priority: 1.0
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
    // subject
    const slug_strs = contents.map(content => {
        return `${baseUrl}/${content.subject_slug}`.toLowerCase()
            .trim()
            .replace(/\/+$/, '')
    })
    // 重複を削除
    const slug_set = new Set(slug_strs)
    slug_set.forEach(slug => {
        sitemap.push({
            url: slug,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.9
        })
    })
    // cat
    const catslug_strs = contents.map(content => {
        return `${baseUrl}/${content.subject_slug}/${content.cat_slug}`.toLowerCase()
            .trim()
            .replace(/\/+$/, '')
    })
    // 重複を削除
    const catslug_set = new Set(catslug_strs)
    catslug_set.forEach(slug => {
        sitemap.push({
            url: slug,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.8
        })
    })
    // deep subcat
    const subslug_strs = contents.map(content => {
        return `${baseUrl}/${content.subject_slug}/${content.cat_slug}/${content.subcat_slug}`.toLowerCase()
            .trim()
            .replace(/\/+$/, '')
    })
    // 重複を削除
    const subslug_set = new Set(subslug_strs)
    subslug_set.forEach(slug => {
        sitemap.push({
            url: slug,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.7
        })
    })


    // コンテンツ情報を追記する
    console.log('contents.length', contents.length)
    contents.forEach((content, index) => {
        if (index > 330) {
            return;
        }

        // 日付をDate型に変換
        const date = content.updated_at ? new Date(content.updated_at) : new Date(content.created_at);
        const contentUrl = `${baseUrl}/${content.subject_slug}/${content.cat_slug}/${content.subcat_slug}/${content.id}`
            .toLowerCase()
            .trim()
            .replace(/\/+$/, '');
        sitemap.push({
            url: contentUrl,
            lastModified: date,
            changeFrequency: 'daily',
            priority: 0.6
        })
    })

    const otherPages: SitemapRow[] = [
        {
            url: '/about',
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.2
        },
        {
            url: '/poricy',
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.2
        }
    ];

    otherPages.forEach(page => {
        sitemap.push({
            url: `${baseUrl}${page.url}`,
            lastModified: page.lastModified,
            changeFrequency: page.changeFrequency,
            priority: page.priority
        })
    })


    // 生成したsitemap.urlを配列として取得
    const urls = sitemap.map(page => page.url)
    // 重複がないか厳重に確認
    const uniqueUrls = new Set(urls)
    if (urls.length !== uniqueUrls.size) {
        console.error('重複するURLがあります')
    } else {
        console.debug('重複なし', urls.length)
    }


    return sitemap
}