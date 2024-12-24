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
    subject_slug: string;
    base: string;
    content: string;
    laugh_content: string;
    images?: string[];
    model_name: string;
    created_at: string;
    updated_at?: string;
}

export const switch_slug_to_label = (cat_slug: string, subcat_slug: string): string => {
    const concat_slug = cat_slug + subcat_slug;
    switch (cat_slug) {
        case "el":
            switch (concat_slug) {
                case "el1":
                    return "小学1年生";
                case "el2":
                    return "小学2年生";
                case "el3":
                    return "小学3年生";
                case "el4":
                    return "小学4年生";
                case "el5":
                    return "小学5年生";
                case "el6":
                    return "小学6年生";
                default:
                    return "小学区分";
            }
        case "md":
            switch (concat_slug) {
                case "md1":
                    return "中学1年生";
                case "md2":
                    return "中学2年生";
                case "md3":
                    return "中学3年生";
                default:
                    return "中学区分";
            }
        case "hi":
            // 高校数学Ⅰ
            // 高校数学A
            // 高校数学Ⅱ
            // 高校数学B
            // 高校数学Ⅲ
            switch (concat_slug) {
                case "hi1":
                    return "高校数学Ⅰ";
                case "hi2":
                    return "高校数学A";
                case "hi3":
                    return "高校数学Ⅱ";
                case "hi4":
                    return "高校数学B";
                case "hi5":
                    return "高校数学Ⅲ";
                default:
                    return "高校区分";
            }
        default:
            return "学習要項";
    }

}