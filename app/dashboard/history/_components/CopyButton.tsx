"use client"
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

function CopyButton({aiResponse}: {aiResponse?: string}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!aiResponse) return;
    try {
      await navigator.clipboard.writeText(aiResponse);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div>
      <Button
        variant='ghost'
        className='text-primary hover:text-primary/80 font-medium'
        onClick={handleCopy}
      >
        {copied ? 'Copied!' : 'Copy'}
      </Button>
    </div>
  )
}

export default CopyButton
