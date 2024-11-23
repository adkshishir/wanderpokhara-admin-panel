import { SiteForm } from '@/components/site-form';
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
import React from 'react';

const change = async () => {
  let siteInfo: TSiteInformations = {
    id: 1,
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
    logo: '',
    darkLogo: '',
    favicon: '',
    banner: '',
    bannerTitle: '',
    bannerDescription: '',
    bannerKeys: '',
    aboutUs: '',
    createdAt: '',
    updatedAt: '',
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
    <Card className='m-4 p-4'>
      <SiteForm siteInfo={siteInfo} />
    </Card>
  );
};

export default change;
