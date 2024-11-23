import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import api from '@/repo/api';
import request from '@/repo/request';
import { TSiteInformations } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const SiteInformations = async () => {
  let siteInfo: TSiteInformations = {
    id: 1,
    phone1: '',
    phone2: undefined,
    infoEmail: '',
    salesEmail: undefined,
    supportEmail: undefined,
    address: undefined,
    city: undefined,
    state: undefined,
    country: undefined,
    zipCode: undefined,
    logo: '',
    darkLogo: undefined,
    favicon: undefined,
    banner: undefined,
    bannerTitle: undefined,
    bannerDescription: undefined,
    bannerKeys: undefined,
    aboutUs: undefined,
    createdAt: '',
    updatedAt: undefined,
  };
  await request.get({
    endPoint: api.SITE_INFORMATIONS,
    success: (message: string, response: any) => {
      siteInfo = response.data;
    },
    failure: (message: string) => {
      console.log(message);
    },
  });
  return (
    <Card className='m-4'>
      <CardHeader className=''>
        <CardTitle className='justify-between flex w-full items-center'>
          Site Informations
          <Link
            href={'/admin/site-informations/change'}
            className='bg-primary text-white w-fit rounded-md px-4 py-2'>
            Edit
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className='font-medium text-md'>
          Phone1: {siteInfo.phone1}
        </CardDescription>
        <CardDescription className='font-medium text-md'>
          Phone2: {siteInfo.phone2}
        </CardDescription>
        <CardDescription className='font-medium text-md'>
          Info Email: {siteInfo.infoEmail}
        </CardDescription>
        <CardDescription className='font-medium text-md'>
          Sales Email: {siteInfo.salesEmail}
        </CardDescription>
        <CardDescription className='font-medium text-md'>
          Support Email: {siteInfo.supportEmail}
        </CardDescription>
        <CardDescription className='font-medium text-md'>
          Address: {siteInfo.address}
        </CardDescription>
        <CardDescription className='font-medium text-md'>
          City: {siteInfo.city}
        </CardDescription>
        <CardDescription className='font-medium text-md'>
          State: {siteInfo.state}
        </CardDescription>
        <CardDescription className='font-medium text-md'>
          Country: {siteInfo.country}
        </CardDescription>
        <CardDescription className='font-medium text-md'>
          Zip Code: {siteInfo.zipCode}
        </CardDescription>
        <CardDescription className='font-medium text-md'>
          Banner Title: {siteInfo.bannerTitle}
        </CardDescription>
        <CardDescription className='font-medium text-md'>
          Banner Description: {siteInfo.bannerDescription}
        </CardDescription>
        <CardDescription className='font-medium text-md'>
          Banner Keys: {siteInfo.bannerKeys}
        </CardDescription>
        <CardDescription className='font-medium text-md'>
          About Us: {siteInfo.aboutUs}
        </CardDescription>
        <CardDescription className='font-medium text-md'>
          Logo:{' '}
          <Image
            src={siteInfo.logo || '/placeholder.svg'}
            alt='logo'
            width={100}
            height={100}
          />
        </CardDescription>
        <CardDescription className='font-medium text-md'>
          Dark Logo:
          <Image
            src={siteInfo.darkLogo || '/placeholder.svg'}
            alt='logo'
            width={100}
            height={100}
          />
        </CardDescription>
        <CardDescription className='font-medium text-md'>
          Favicon:
          <Image
            src={siteInfo.favicon || '/placeholder.svg'}
            alt='logo'
            width={100}
            height={100}
          />
        </CardDescription>
        <CardDescription className='font-medium text-md'>
          Banner:
          <Image
            src={siteInfo.banner || '/placeholder.svg'}
            alt='logo'
            width={100}
            height={100}
          />
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default SiteInformations;
