'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TSiteInformations } from '@/types';
import request from '@/repo/request';
import api from '@/repo/api';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { set } from 'react-hook-form';
import { Loader2 } from 'lucide-react';

export function SiteForm(props: { siteInfo: TSiteInformations }) {
  const [formData, setFormData] = useState({
    phone1: '',
    phone2: '',
    infoEmail: '',
    salesEmail: '',
    supportEmail: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    bannerTitle: '',
    bannerDescription: '',
    bannerKeys: '',
    aboutUs: '',
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState({
    logo: null,
    darkLogo: null,
    favicon: null,
    banner: null,
  });
  useEffect(() => {
    if (props.siteInfo) {
      setFormData({
        phone1: props.siteInfo.phone1 || '',
        phone2: props.siteInfo.phone2 || '',
        infoEmail: props.siteInfo.infoEmail || '',
        salesEmail: props.siteInfo.salesEmail || '',
        supportEmail: props.siteInfo.supportEmail || '',
        address: props.siteInfo.address || '',
        city: props.siteInfo.city || '',
        state: props.siteInfo.state || '',
        country: props.siteInfo.country || '',
        zipCode: props.siteInfo.zipCode || '',
        bannerTitle: props.siteInfo.bannerTitle || '',
        bannerDescription: props.siteInfo.bannerDescription || '',
        bannerKeys: props.siteInfo.bannerKeys || '',
        aboutUs: props.siteInfo.aboutUs || '',
      });
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: any) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setFiles((prev) => ({ ...prev, [name]: files }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);
    const payload = new FormData();
    payload.append('phone1', formData.phone1);
    payload.append('phone2', formData.phone2);
    payload.append('infoEmail', formData.infoEmail);
    payload.append('salesEmail', formData.salesEmail);
    payload.append('supportEmail', formData.supportEmail);
    payload.append('address', formData.address);
    payload.append('city', formData.city);
    payload.append('state', formData.state);
    payload.append('country', formData.country);
    payload.append('zipCode', formData.zipCode);
    payload.append('bannerTitle', formData.bannerTitle);
    payload.append('bannerDescription', formData.bannerDescription);
    payload.append('bannerKeys', formData.bannerKeys);
    payload.append('aboutUs', formData.aboutUs);

    if (files.logo)
      payload.append('logo', files.logo[0] || props.siteInfo?.logo);
    if (files.darkLogo)
      payload.append('darkLogo', files.darkLogo[0] || props.siteInfo?.darkLogo);
    if (files.favicon)
      payload.append('favicon', files.favicon[0] || props.siteInfo?.favicon);
    if (files.banner)
      payload.append('banner', files.banner[0] || props.siteInfo?.banner);
    await request.postWithFile({
      endPoint: api.SITE_INFORMATIONS,
      data: payload,
      success: (message: string, data: any) => {
        toast.success(message);
        setLoading(false);
        router.push('/admin/site-informations');
      },
      failure: (message: string) => {
        toast.error(message);
        setLoading(false);
      },
    });
  };

  return (
    <Card className='w-full  mx-auto'>
      <CardHeader>
        <CardTitle>Site Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-4' name='site-form'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='phone1'>Phone 1</Label>
              <Input
                id='phone1'
                name='phone1'
                value={formData.phone1}
                onChange={handleInputChange}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='phone2'>Phone 2</Label>
              <Input
                id='phone2'
                name='phone2'
                value={formData.phone2}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className='grid grid-cols-3 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='infoEmail'>Info Email</Label>
              <Input
                id='infoEmail'
                name='infoEmail'
                type='email'
                value={formData.infoEmail}
                onChange={handleInputChange}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='salesEmail'>Sales Email</Label>
              <Input
                id='salesEmail'
                name='salesEmail'
                type='email'
                value={formData.salesEmail}
                onChange={handleInputChange}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='supportEmail'>Support Email</Label>
              <Input
                id='supportEmail'
                name='supportEmail'
                type='email'
                value={formData.supportEmail}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='address'>Address</Label>
            <Input
              id='address'
              name='address'
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='city'>City</Label>
              <Input
                id='city'
                name='city'
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='state'>State</Label>
              <Input
                id='state'
                name='state'
                value={formData.state}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='country'>Country</Label>
              <Input
                id='country'
                name='country'
                value={formData.country}
                onChange={handleInputChange}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='zipCode'>Zip Code</Label>
              <Input
                id='zipCode'
                name='zipCode'
                value={formData.zipCode}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='logo'>Logo</Label>
              <Input
                id='logo'
                name='logo'
                type='file'
                accept='image/*'
                onChange={handleFileChange}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='darkLogo'>Dark Logo</Label>
              <Input
                id='darkLogo'
                name='darkLogo'
                type='file'
                accept='image/*'
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='favicon'>Favicon</Label>
              <Input
                id='favicon'
                name='favicon'
                type='file'
                accept='image/*'
                onChange={handleFileChange}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='banner'>Banner</Label>
              <Input
                id='banner'
                name='banner'
                type='file'
                accept='image/*'
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='bannerTitle'>Banner Title</Label>
            <Input
              id='bannerTitle'
              name='bannerTitle'
              value={formData.bannerTitle}
              onChange={handleInputChange}
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='bannerDescription'>Banner Description</Label>
            <Textarea
              id='bannerDescription'
              name='bannerDescription'
              value={formData.bannerDescription}
              onChange={handleInputChange}
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='bannerKeys'>Banner Keys</Label>
            <Input
              id='bannerKeys'
              name='bannerKeys'
              value={formData.bannerKeys}
              onChange={handleInputChange}
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='aboutUs'>About Us</Label>
            <Textarea
              id='aboutUs'
              name='aboutUs'
              value={formData.aboutUs}
              onChange={handleInputChange}
            />
          </div>

          <Button type='submit' className='w-full'>
            {loading ? (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              <span>Save</span>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
