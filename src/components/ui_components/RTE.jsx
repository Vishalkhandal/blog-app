import React, { useEffect, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import conf from '../../conf/conf';

export default function RTE({ name, control, label, defaultValue = "" }) {
  const theme = useSelector((state) => state.theme.theme);
  const [editorKey, setEditorKey] = useState(0);

  // Force re-render of editor when theme changes
  useEffect(() => {
    setEditorKey(prev => prev + 1);
  }, [theme]);

  return (
    <div className='w-full'>
      {label && (
        <label className='block mb-1 text-gray-700 dark:text-gray-200 pl-1'>
          {label}
        </label>
      )}
      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Editor
            key={editorKey}
            apiKey={conf.tinyMceApiKey}
            value={value}
            onEditorChange={onChange}
            init={{
              height: 500,
              menubar: true,
              skin: theme === 'dark' ? 'oxide-dark' : 'oxide',
              content_css: theme === 'dark' ? 'dark' : 'default',
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style: theme === 'dark' 
                ? "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; color: #e5e7eb; background-color: #1f2937; }" 
                : "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; color: #374151; background-color: #ffffff; }",
              branding: false,
              promotion: false,
              statusbar: false,
              resize: false,
              setup: (editor) => {
                editor.on('init', () => {
                  editor.getBody().style.backgroundColor = theme === 'dark' ? '#1f2937' : '#ffffff';
                  editor.getBody().style.color = theme === 'dark' ? '#e5e7eb' : '#374151';
                });
              }
            }}
          />
        )}
      />
    </div>
  )
}

