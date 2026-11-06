"use client"
import React, { useEffect, useRef, useState } from 'react'
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  aiOutput: string;
}

function OutputSection({aiOutput}: Props) {
  const editorRef = useRef<any>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance?.();
      if (editorInstance && typeof editorInstance.setMarkdown === 'function') {
        editorInstance.setMarkdown(aiOutput || '');
      }
    }
  }, [aiOutput]);

  const handleCopy = async () => {
    if (!aiOutput) return;
    try {
      await navigator.clipboard.writeText(aiOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard', err);
    }
  };

  return (
    <div className='bg-white shadow-lg border rounded-lg'>
      <div className='flex justify-between items-center p-5'>
        <h2 className='font-medium text-lg'>Your Result</h2>
        <Button
          className='flex gap-2 items-center'
          onClick={handleCopy}
          disabled={!aiOutput}
        >
          {copied ? <Check className='w-4 h-4 text-green-400' /> : <Copy className='w-4 h-4'/>}
          {copied ? 'Copied!' : 'Copy'}
        </Button>
      </div>
      <Editor
        ref={editorRef}
        initialValue="Your result will appear here"
        initialEditType="wysiwyg"
        height="600px"
        useCommandShortcut={true}
        onChange={() => {
          if (editorRef.current?.getInstance) {
            console.log(editorRef.current.getInstance().getMarkdown());
          }
        }}
      />
    </div>
  )
}

export default OutputSection
