import { PostEditorComponent } from '@/components/post-editor';
import { Card } from '@/components/ui/card';
import api from '@/repo/api';
import request from '@/repo/request';
import React from 'react';

const page = async () => {
  let categories: { name: string; id: number }[] = [];
  await request.get({
    endPoint: api.CATEGORY,
    data: {},
    success: (message: string, response: any) => {
      categories = response.data;
    },
    failure: (message: string) => {},
  });

  return (
    <Card className='m-4'>
      <PostEditorComponent categories={categories} />
    </Card>
  );
};

export default page;
