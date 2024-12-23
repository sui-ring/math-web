export type Pair = {
    label: string;
    slug: string;
};

export interface Content {
    id: string;
    title: string;
    url?: string;
    cat: string;
    cat_slug: string;
    subcat: string;
    subcat_slug: string;
    subject: string;
    base: string;
    content: string;
    laugh_content: string;
    model_name: string;
    created_at: string;
}