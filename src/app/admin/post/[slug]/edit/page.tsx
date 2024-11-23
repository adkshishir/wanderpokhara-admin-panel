import { PostEditorComponent } from '@/components/post-editor';
import { Card } from '@/components/ui/card';
import api from '@/repo/api';
import request from '@/repo/request';
import { TPost } from '@/types';
import React from 'react';

const Edit = async ({ params }: any) => {
  let initialData: TPost = undefined;
  let categories: { name: string; id: number }[] = [];
  await request.get({
    endPoint: api.CATEGORY,
    data: {},
    success: (message: string, response: any) => {
      categories = response.data;
    },
    failure: (message: string) => {},
  });

  await request.get({
    endPoint: `${api.POST}/${params.slug}`,
    params: undefined,
    success: (message: string, response: { data: TPost }) => {
      initialData = response.data;
    },
    failure: (message: string) => {},
  });
  return (
    <Card className='m-4'>
      <PostEditorComponent categories={categories} initialData={initialData} />
    </Card>
  );
};

export default Edit;
