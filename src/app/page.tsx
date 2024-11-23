// app/page.js or pages/index.js
'use client';

import { SetStateAction, useState } from 'react';

export default function Page() {
  const [content, setContent] = useState('');

  const handleEditorChange = (content: SetStateAction<string>) => {
    setContent(content);
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Rich Text Editor</h1>
    </div>
  );
}
