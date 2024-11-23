import CategoryForm from '@/components/category-form';
import { Card } from '@/components/ui/card';
import React from 'react';

const AddCategory = () => {
  return (
    <Card className='m-4'>
      <CategoryForm />
    </Card>
  );
};

export default AddCategory;
