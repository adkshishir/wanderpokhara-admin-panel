import CategoryForm from '@/components/category-form';
import api from '@/repo/api';
import request from '@/repo/request';
import { TCategory } from '@/types';
import React from 'react';

const EditCategory = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  let category: TCategory = undefined;
  const { slug } = await params;
  console.log(slug);
  await request.get({
    endPoint: `${api.CATEGORY}/${slug}`,
    params: undefined,
    success: (message: string, response: any) => {
      category = response.data;
      console.log(response);
    },
    failure: (message: string) => {},
  });

  return <CategoryForm initialData={category} />;
};

export default EditCategory;
