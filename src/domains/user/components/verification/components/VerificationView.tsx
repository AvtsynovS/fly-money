'use client';

import React, { useState } from 'react';
import { Button } from '@ui/button';
import { cn } from '@lib/utils';
import { List, ListItem, Typography, Workspace } from '@/components/shared';
import { FileText } from 'lucide-react';

const verifyOptions = [
  {
    id: 1,
    option: 'Подготовить документы — паспорт или загранпаспорт',
  },
  {
    id: 2,
    option: 'Загрузить фото или сканы документов',
  },
  {
    id: 3,
    option: 'Отправить на верификацию',
  },
  {
    id: 4,
    option: 'Дождаться подтверждения',
    hint: 'ответим в течение 2 минут',
  },
];

// TODO подключить Zustand
// TODO настроить моки

export const VerificationView = () => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files) {
      const files = Array.from(e.dataTransfer.files);
      setUploadedFiles((prev) => [...prev, ...files]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setUploadedFiles((prev) => [...prev, ...files]);
    }
  };

  return (
    <Workspace>
      <Typography variant="h2" as="h2">
        Верификация
      </Typography>
      <div className="flex flex-col items-start gap-6 rounded-xl border border-border bg-card p-4 shadow-sm sm:p-6">
        <div className="space-y-4">
          <Typography variant="h4" as="h4">
            Как пройти верификацию
          </Typography>
          <List variant="decimal">
            {verifyOptions.map(({ id, option, hint }) => {
              return (
                <ListItem key={id} className="items-center">
                  <Typography variant="body" as="span">
                    {option}
                  </Typography>{' '}
                  {hint && (
                    <Typography variant="hint" as="span">
                      {hint}
                    </Typography>
                  )}
                </ListItem>
              );
            })}
          </List>
        </div>

        <Button className="font-semibold sm:w-auto"> Начать верификацию</Button>
      </div>
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={cn(
          'relative flex min-h-45 flex-col items-center justify-center gap-4 rounded-xl border border-dashed bg-card p-4 text-center shadow-sm transition-all sm:p-6',
          isDragActive
            ? 'scale-[1.01] border-primary bg-primary/5'
            : 'border-border hover:border-muted-foreground/30',
        )}
      >
        <input
          type="file"
          id="file-upload"
          multiple
          accept=".jpg,.jpeg,.png,.pdf"
          className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
          onChange={handleFileChange}
        />

        <div className="pointer-events-none flex flex-col gap-2">
          <Typography variant="description" as="p">
            Перетащите файл сюда или{' '}
            <Typography
              variant="description"
              as="span"
              className="font-semibold text-primary"
            >
              нажмите, чтобы загрузить
            </Typography>
          </Typography>
          <Typography variant="hint" as="p">
            JPG, PNG или PDF, до 10 МБ
          </Typography>
        </div>
        {uploadedFiles.length > 0 && (
          <div className="pointer-events-auto relative z-20 w-full max-w-md rounded-md border border-border p-2">
            <Typography
              variant="body"
              as="p"
              className="px-1 text-left text-xs font-semibold"
            >
              Выбранные файлы:
            </Typography>
            <List
              variant="custom"
              className="space-y-1.5 divide-y divide-border"
            >
              {uploadedFiles.map((file, idx) => (
                <ListItem key={idx}>
                  <FileText className="h-3 w-3 text-primary" />
                  <div className="flex flex-1 items-baseline justify-between gap-1">
                    <Typography variant="body" as="p">
                      {file.name}
                    </Typography>
                    <Typography variant="hint" as="span" className="min-w-12.5">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </Typography>
                  </div>
                </ListItem>
              ))}
            </List>
          </div>
        )}
      </div>
    </Workspace>
  );
};
