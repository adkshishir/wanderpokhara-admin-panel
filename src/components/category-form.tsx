'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import request from '@/repo/request';
import api from '@/repo/api';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import SeoFields, { SeoData } from './seo-fields';

export default function CategoryForm({ initialData }: { initialData?: any }) {
  const [seoData, setSeoData] = useState<SeoData>({
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    canonical: '',
    schema: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: null,
  });
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    slug: string;
    image: File | null | string;
  }>({
    name: '',
    description: '',
    slug: '',
    image: null,
  });
  const router = useRouter();

  useEffect(() => {
    if (initialData) {
      setFormData((prevData) => ({
        ...prevData,
        ...initialData,
      }));
      if (initialData.seo) {
        setSeoData({
          metaTitle: initialData.seo.metaTitle,
          metaDescription: initialData.seo.metaDescription,
          metaKeywords: initialData.seo.metaKeywords,
          canonical: initialData.seo.canonical,
          schema: initialData.seo.schema,
          ogTitle: initialData.seo.ogTitle,
          ogDescription: initialData.seo.ogDescription,
          ogImage: initialData.seo.ogImage,
        });
      }
    }
  }, []);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('description', formData.description);
    payload.append('slug', formData.slug);
    payload.append('image', formData.image || '');
    payload.append('seo', JSON.stringify(seoData));
    payload.append('seo.ogImage', seoData.ogImage || '');
    console.log(formData, JSON.stringify(seoData));
    if (initialData) {
      await request.patchWithFile({
        endPoint: `${api.CATEGORY}/${initialData.slug}`,
        data: payload,
        success: (message: string, response: any) => {
          toast.success(message);
          router.push('/admin/category');
        },
        failure: (error: any) => {
          toast.error(error.message);
          console.log(error);
        },
      });
      return;
    } else
      await request.postWithFile({
        endPoint: api.CATEGORY,
        data: payload,
        success: (message: string, response: any) => {
          toast.success(message);
          router.push('/admin/category');
        },
        failure: (error: any) => {
          toast.error(error.message);
          console.log(error);
        },
      });
  };

  return (
    <Card className='w-full m-8 max-w-4xl mx-auto'>
      <CardHeader>
        <CardTitle>Category Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit}
          className='space-y-4'
          name='category-form'>
          <div className='space-y-2'>
            <Label htmlFor='name'>Name</Label>
            <Input
              id='name'
              name='name'
              value={formData.name || ''}
              onChange={handleInputChange}
            />
          </div>

          <div className='lg:flex gap-2 items-center'>
            <div className='space-y-2 w-full'>
              <Label htmlFor='slug'>Slug</Label>
              <Input
                id='slug'
                name='slug'
                value={formData.slug}
                onChange={handleInputChange}
              />
            </div>
            <div className='space-y-2 lg:w-2/3'>
              <Label htmlFor='image'>Image</Label>
              <Input
                id='image'
                name='image'
                type='file'
                accept='image/*'
                onChange={handleImageChange}
              />
              {formData.image && (
                <img
                  src={
                    typeof formData.image === 'string'
                      ? formData.image
                      : URL.createObjectURL(formData.image) || ''
                  }
                  alt='Category'
                  className='mt-2 max-w-full h-auto'
                  style={{ maxHeight: '200px' }}
                />
              )}
            </div>
          </div>
          <div className='space-y-2'>
            <Label htmlFor='description'>Description</Label>
            <Textarea
              id='description'
              name='description'
              value={formData.description || ''}
              onChange={handleInputChange}
            />
          </div>
          <SeoFields seoData={seoData} setSeoData={setSeoData} />

          <Button type='submit' className='w-full'>
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
