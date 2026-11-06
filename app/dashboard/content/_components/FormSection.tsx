"use client"
import React, { useState } from 'react'
import { TEMPLATE } from '../../_components/TemplateListSection'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Loader2Icon } from 'lucide-react'

interface PROPS{
  selectedTemplate?: TEMPLATE;
  userFromInput: (formData: any) => void;
  loading: boolean;
}

function FormSection({selectedTemplate, userFromInput, loading}: PROPS) {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    userFromInput(formData);
  }

  return (
    <div className='p-5 shadow-md border rounded-lg bg-white'>
      <Image
        src={selectedTemplate?.icon || '/logo.svg'}
        alt={selectedTemplate?.name || 'template icon'}
        width={70}
        height={70}
      />
      <h2 className='font-bold text-2xl mb-2 mt-4 text-black'>{selectedTemplate?.name || 'Template'}</h2>
      <p className='text-gray-500 text-sm'>{selectedTemplate?.desc}</p>
      <form className='mt-6' onSubmit={onSubmit}>
        {selectedTemplate?.form?.map((item, index) => (
          <div key={item.name || index} className='my-2 flex flex-col gap-2 mb-7'>
            <label className='font-bold text-sm'>{item.label}</label>
            {item.field === 'input' ? (
              <Input
                name={item.name}
                required={item?.required}
                onChange={handleInputChange}
              />
            ) : item.field === 'textarea' ? (
              <Textarea
                name={item.name}
                required={item?.required}
                onChange={handleInputChange}
              />
            ) : null}
          </div>
        ))}
        <Button
          type='submit'
          className='w-full py-6 flex items-center justify-center gap-2'
          disabled={loading}
        >
          {loading && <Loader2Icon className='animate-spin h-5 w-5'/>}
          Generate Content
        </Button>
      </form>
    </div>
  )
}

export default FormSection
