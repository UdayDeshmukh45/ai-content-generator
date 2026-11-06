"use client"
import React, { useState } from 'react'
import FormSection from '../_components/FormSection'
import OutputSection from '../_components/OutputSection'
import { TEMPLATE } from '../../_components/TemplateListSection'
import Templates from '@/app/(data)/Templates'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { chatSession } from '@/utils/AiModal'
import moment from 'moment'
import { useUser } from '@clerk/nextjs'
import { AIOutput } from '@/utils/schema'
import { db } from '@/utils/db'

interface PROPS {
  params: {
    'template-slug': string;
  };
}

function CreateNewContent(props: PROPS) {
  const selectedTemplate: TEMPLATE | undefined = Templates?.find(
    (item) => item.slug === props.params['template-slug']
  );
  const [loading, setLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { user } = useUser();

  const GenerateAIContent = async (formData: any) => {
    setLoading(true);
    setErrorMessage('');
    try {
      const selectedPrompt = selectedTemplate?.aiPrompt || '';
      const finalAIPrompt = JSON.stringify(formData) + ", " + selectedPrompt;
      const result = await chatSession.sendMessage(finalAIPrompt);
      const textOutput = result?.response?.text() || '';
      setAiOutput(textOutput);
      await SaveInDb(JSON.stringify(formData), selectedTemplate?.slug || '', textOutput);
    } catch (err: any) {
      console.error("AI Generation error:", err);
      setErrorMessage(err?.message || "Failed to generate content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const SaveInDb = async (formData: string, slug: string, aiResp: string) => {
    try {
      const result = await db.insert(AIOutput).values({
        formData: formData,
        templateSlug: slug,
        aiResponse: aiResp,
        createdBy: user?.primaryEmailAddress?.emailAddress || 'anonymous',
        createdAt: moment().format('DD/MM/yyyy'),
      });
      console.log('Saved to DB:', result);
    } catch (dbError) {
      console.error('Error saving to DB:', dbError);
    }
  };

  if (!selectedTemplate) {
    return (
      <div className='p-10 text-center'>
        <h2 className='text-2xl font-bold text-gray-800 mb-4'>Template Not Found</h2>
        <p className='text-gray-500 mb-6'>The requested AI template does not exist.</p>
        <Link href="/dashboard">
          <Button><ArrowLeft className='mr-2 h-4 w-4'/> Back to Dashboard</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className='p-5'>
      <Link href={"/dashboard"}>
        <Button variant='outline' className='flex gap-2 items-center'>
          <ArrowLeft className='h-4 w-4'/> Back
        </Button>
      </Link>
      {errorMessage && (
        <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mt-4'>
          {errorMessage}
        </div>
      )}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 py-5'>
        <FormSection
          selectedTemplate={selectedTemplate}
          userFromInput={(v: any) => GenerateAIContent(v)}
          loading={loading}
        />
        <div className='col-span-2'>
          <OutputSection aiOutput={aiOutput} />
        </div>
      </div>
    </div>
  )
}

export default CreateNewContent
