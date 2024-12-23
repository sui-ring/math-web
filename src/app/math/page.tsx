'use client';
import React from 'react';
import Search from '../../../features/search';

const Page = async ({ params }: {
    params: Promise<{ cat_slug: string; subcat_slug: string; }>
}) => {

    return (
        <Search />
    );
}


export default Page;