import Templates from '@/app/(data)/Templates'
import { db } from '@/utils/db'
import { AIOutput } from '@/utils/schema'
import { currentUser } from '@clerk/nextjs/server'
import { desc, eq } from 'drizzle-orm'
import Image from 'next/image'
import React from 'react'
import { TEMPLATE } from '../_components/TemplateListSection'
import CopyButton from './_components/CopyButton'

export interface HISTORY {
  id: number;
  formData: string | null;
  aiResponse: string | null;
  templateSlug: string | null;
  createdBy: string | null;
  createdAt: string | null;
}

async function History() {
  const user = await currentUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  let HistoryList: HISTORY[] = [];

  if (userEmail) {
    try {
      {/* @ts-ignore */}
      HistoryList = await db.select().from(AIOutput)
        .where(eq(AIOutput.createdBy, userEmail))
        .orderBy(desc(AIOutput.id));
    } catch (err) {
      console.error('Failed to fetch history:', err);
    }
  }

  const GetTemplate = (slug: string | null): TEMPLATE | undefined => {
    if (!slug) return undefined;
    return Templates?.find((item) => item.slug === slug);
  };

  return (
    <div className='m-5 p-5 border rounded-lg bg-white shadow-sm'>
      <h2 className='font-bold text-3xl'>History</h2>
      <p className='text-gray-500'>Search your previously generated AI content</p>
      
      <div className='overflow-x-auto'>
        <div className='grid grid-cols-7 font-bold bg-secondary mt-5 py-3 px-3 rounded-t-md min-w-[700px]'>
          <h2 className='col-span-2'>TEMPLATE</h2>
          <h2 className='col-span-2'>AI RESP</h2>
          <h2>DATE</h2>
          <h2>WORDS</h2>
          <h2>COPY</h2>
        </div>

        {HistoryList.length === 0 ? (
          <div className='text-center py-10 text-gray-500'>
            No history found. Generate some content to see it here!
          </div>
        ) : (
          HistoryList.map((item: HISTORY, index: number) => {
            const template = GetTemplate(item?.templateSlug);
            const wordCount = item?.aiResponse ? item.aiResponse.trim().split(/\s+/).filter(Boolean).length : 0;
            return (
              <React.Fragment key={item.id ? String(item.id) : String(index)}>
                <div className='grid grid-cols-7 my-3 py-3 px-3 items-center min-w-[700px]'>
                  <div className='col-span-2 flex gap-2 items-center'>
                    <Image
                      src={template?.icon || '/logo.svg'}
                      width={25}
                      height={25}
                      alt={template?.name || 'template icon'}
                    />
                    <span className='font-medium text-sm'>{template?.name || item?.templateSlug || 'Custom'}</span>
                  </div>
                  <h2 className='col-span-2 line-clamp-3 mr-3 text-sm text-gray-700'>{item?.aiResponse || ''}</h2>
                  <h2 className='text-sm text-gray-600'>{item.createdAt}</h2>
                  <h2 className='text-sm'>{wordCount}</h2>
                  <div>
                    <CopyButton aiResponse={item.aiResponse || ''} />
                  </div>
                </div>
                <hr/>
              </React.Fragment>
            );
          })
        )}
      </div>
    </div>
  )
}

export default History
