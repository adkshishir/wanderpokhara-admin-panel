'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
// import CustomCKEditor from './ck-editor';
const CustomCKEditor = dynamic(
  () => import('./ck-editor').then((mod) => mod.default),
  {}
);
import SeoFields from './seo-fields';
import request from '@/repo/request';
import api from '@/repo/api';
import toast from 'react-hot-toast';
import { TSeo } from '@/types';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Car, Delete } from 'lucide-react';

type PostData = {
  title: string | null;
  slug: string;
  description: string | null;
  status: string | null;
  h1: string | null;
  userId: string | null;
  categoryId: string;
  createdAt: string;
  content: string | null;
  readTime: string;
  images: (
    | File
    | {
        url: string;
        alt: string;
      }
  )[];

  seo: TSeo | undefined;
};

const statusOptions = ['unpublished', 'published'];

export function PostEditorComponent({
  initialData,
  categories,
}: {
  initialData?: Partial<PostData>;
  categories: {
    id: number;
    name: string;
  }[];
}) {
  const [formData, setFormData] = useState<PostData>({
    title: initialData?.title || null,
    slug: initialData?.slug || '',
    description: initialData?.description || null,
    status: initialData?.status || 'draft',
    h1: initialData?.h1 || null,
    userId: initialData?.userId || null,
    categoryId: initialData?.categoryId || '',
    createdAt: new Date().toISOString(),
    content: initialData?.content || null,
    images: initialData?.images || [],
    seo: initialData?.seo || undefined,
    readTime: initialData?.readTime || '',
  });
  const [seoData, setSeoData] = useState<any>({
    metaTitle: initialData?.seo?.metaTitle || '',
    metaDescription: initialData?.seo?.metaDescription || '',
    metaKeywords: initialData?.seo?.metaKeywords || '',
    canonical: initialData?.seo?.canonical || '',
    schema: initialData?.seo?.schema || '',
    ogTitle: initialData?.seo?.ogTitle || '',
    ogDescription: initialData?.seo?.ogDescription || '',
    ogImage: initialData?.seo?.ogImage || null,
  });
  const [writingSeo, setWritingSeo] = useState(false);
  const router = useRouter();
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof PostData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...Array.from(e.target.files as FileList)],
      }));
    }

  };
  const handleSubmit = async (e: React.FormEvent) => {
    const payload = new FormData();
    payload.append('title', formData.title || '');
    payload.append('slug', formData.slug);
    payload.append('description', formData.description || '');
    payload.append('status', formData.status || '');
    payload.append('h1', formData.h1 || '');
    payload.append('userId', formData.userId || '');
    payload.append('categoryId', formData.categoryId);
    payload.append('createdAt', formData.createdAt);
    payload.append('content', formData.content || '');
    payload.append('readTime', formData.readTime);
    if (formData.images.length > 0) {
      Array.from(formData.images).forEach((file) => {
        // payload.append('images', file.url ? file.url : file);
        file instanceof File
          ? payload.append('images', file)
          : payload.append('images', JSON.stringify(file));
      });
    }
    payload.append('seo', JSON.stringify(seoData));
    payload.append('seo.ogImage', seoData.ogImage || '');
    e.preventDefault();
    if (initialData) {
      await request.patchWithFile({
        endPoint: api.POST + '/' + initialData.slug,
        data: payload,
        success: (message: string, response: any) => {
          toast.success(message);
          router.push('/admin/post');
          router.refresh();
        },
        failure: (error: any) => {
          toast.error(error.message);
          console.log(error);
        },
      });
      return;
    }
    await request.postWithFile({
      endPoint: api.POST,
      data: payload,
      success: (message: string, response: any) => {
        toast.success(message);
        router.push('/admin/post');
        router.refresh();
      },
      failure: (error: any) => {
        toast.error(error.message);
        console.log(error);
      },
    });
  };
  function handleDeleteImage(index: number) {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  }

  return (
    <Card className=' m-4'>
      <CardHeader>
        <CardTitle>Post Editor</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-6' name='post-form'>
          <div className='flex  items-center bg-slate-100 w-fit p-2 rounded-lg space-x-2'>
            <Button
              disabled={!writingSeo}
              type='button'
              onClick={() => setWritingSeo(false)}>
              Write Content
            </Button>
            <Button
              disabled={writingSeo}
              type='button'
              onClick={() => setWritingSeo(true)}>
              Write SEO
            </Button>
          </div>
          {!writingSeo && (
            <div className='p-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {' '}
                <div className='space-y-2'>
                  <Label htmlFor='title'>Title</Label>
                  <Input
                    id='title'
                    name='title'
                    value={formData.title || ''}
                    onChange={handleInputChange}
                    placeholder='Enter post title'
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='slug'>Slug</Label>
                  <Input
                    id='slug'
                    name='slug'
                    value={formData.slug}
                    onChange={handleInputChange}
                    placeholder='Enter post slug'
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='status'>Status</Label>
                  <Select
                    value={formData.status || undefined}
                    onValueChange={(value) =>
                      handleSelectChange('status', value)
                    }>
                    <SelectTrigger>
                      <SelectValue placeholder='Select post status' />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='status'>Category</Label>
                  <Select
                    value={formData.categoryId.toString() || undefined}
                    onValueChange={(value) =>
                      handleSelectChange('categoryId', value)
                    }>
                    <SelectTrigger>
                      <SelectValue placeholder='Select post status' />
                    </SelectTrigger>

                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id.toLocaleString()}>
                          {category.name.charAt(0).toUpperCase() +
                            category.name.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2 w-full'>
                  <Label htmlFor='h1'>H1</Label>
                  <Input
                    id='h1'
                    name='h1'
                    value={formData.h1 || ''}
                    onChange={handleInputChange}
                    placeholder='Enter H1 tag content'
                  />
                </div>
                <div className='space-y-2 w-full'>
                  <Label htmlFor='readTime'>Read Time</Label>
                  <Input
                    id='readTime'
                    name='readTime'
                    value={formData.readTime || ''}
                    onChange={handleInputChange}
                    placeholder='Read Time in minutes'
                  />
                </div>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='description'>Description</Label>
                <Textarea
                  id='description'
                  name='description'
                  value={formData.description || ''}
                  onChange={handleInputChange}
                  placeholder='Enter post description'
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='content'>Content</Label>
                <div className='border rounded-md'>
                  {
                    <CustomCKEditor
                      content={formData.content}
                      onChange={(value: string) =>
                        setFormData((prev) => ({ ...prev, content: value }))
                      }
                    />
                  }
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='images'>Images</Label>
                <Input
                  id='images'
                  name='images'
                  type='file'
                  onChange={handleImageUpload}
                  multiple
                  accept='image/*'
                />
                {formData.images.length > 0 && (
                  <div className='mt-2'>
                    <p>Selected images:</p>
                    <div className='flex flex-wrap'>
                      {formData.images.map((image, index) => (
                        // @ts-ignore
                        <>
                          {image instanceof Blob ? (
                            <Card className='relative'>
                              <Image
                                key={index}
                                src={URL.createObjectURL(image)}
                                alt={`Image ${index}`}
                                width={100}
                                height={100}
                                className='w-32 h-32 object-cover'
                              />

                              <CardFooter className='py-1 flex justify-end'>
                                <Button
                                  type='button'
                                  onClick={() => handleDeleteImage(index)}
                                  size={'sm'}
                                  className='float-right bg-red-500  bottom-4 right-4'>
                                  <Delete
                                    className=' text-white  rounded-full   flex items-center justify-center'
                                    type='image'
                                  />
                                </Button>
                              </CardFooter>
                            </Card>
                          ) : (
                            <Card className='relative'>
                              <Image
                                key={index}
                                src={image.url}
                                alt={`Image ${index}`}
                                width={100}
                                height={100}
                                className='w-32 h-32 object-cover'
                              />
                              <CardFooter className='py-1 flex justify-end'>
                                <Button
                                  type='button'
                                  onClick={() => handleDeleteImage(index)}
                                  size={'sm'}
                                  className='float-right bg-red-500  bottom-4 right-4'>
                                  <Delete
                                    className=' text-white  rounded-full   flex items-center justify-center'
                                    type='image'
                                  />
                                </Button>
                              </CardFooter>
                            </Card>
                          )}
                        </>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {writingSeo && (
            <SeoFields seoData={seoData} setSeoData={setSeoData} />
          )}
          <Button type='submit' className='w-full'>
            Submit Post
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
