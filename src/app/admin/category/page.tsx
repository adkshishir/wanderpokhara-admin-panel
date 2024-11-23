import { Card, CardContent } from '@/components/ui/card';
import {
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from '@/components/ui/table';
import api from '@/repo/api';
import request from '@/repo/request';
import { TCategory } from '@/types';
import { Edit } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Delete } from '../../../components/delete';

const Category = async () => {
  let categories: TCategory[] = [];
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
      <Link
        href={'/admin/category/add'}
        className=' bg-blue-500 mr-2 float-right mt-4 hover:bg-blue-600 text-white px-4 py-2 rounded-md '>
        Add New
      </Link>

      <CardContent className=' p-2'>
        <Table className=''>
          <TableCaption>A list of Categories.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className='text-right'>Slug</TableHead>
              <TableHead className='text-right'>Image</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories?.map((category, index) => (
              <TableRow key={index}>
                <TableCell className='font-medium'>{category?.id}</TableCell>
                <TableCell>{category?.name}</TableCell>
                <TableCell>{category?.description}</TableCell>
                <TableCell className='text-right'>{category?.slug}</TableCell>
                <TableCell className='text-right'>
                  <Image
                    className='rounded-md w-20 h-12 float-right object-cover '
                    src={category?.image || '/placeholder.png'}
                    alt={category?.name || 'category image'}
                    width={100}
                    height={100}
                  />
                </TableCell>
                <TableCell className='text-right justify-end flex gap-1 '>
                  <Link
                    className='text-blue-500 font-semibold hover:text-blue-700 text-md my-auto '
                    href={`/admin/category/${category?.slug}/edit`}>
                    Edit
                  </Link>
                  {category && <Delete type='category' id={category.id} />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            {/* <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className='text-right'>$2,500.00</TableCell>
        </TableRow> */}
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Category;
