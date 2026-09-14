'use client';

import { Button } from '@ui/button';
import { Typography, Workspace } from '@/components/shared';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MessagesSquare, LayoutPanelLeft, MoveRight, Zap } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const mockSocial = [
  {
    id: 1,
    name: 'Telegram',
    href: '#',
  },
  {
    id: 2,
    name: 'WhatsApp',
    href: '#',
  },
];

const mockStatus = [
  {
    id: 1,
    label: 'Процессинг FlyMoney',
    status: 'success',
    text: 'Стабильно',
  },
  {
    id: 2,
    label: 'Банки-партнеры (РФ)',
    status: 'success',
    text: 'Стабильно',
  },
  {
    id: 3,
    label: 'Международные шлюзы',
    status: 'warning',
    text: 'Задержки до 5 мин',
  },
];

const mockFaqItems = [
  {
    question: 'Как долго идет международный перевод?',
    answer:
      'В 90% случаев деньги поступают на счет получателя в течение 2–15 минут. В редких случаях, при дополнительной проверке банком-корреспондентом, перевод может занять до 1 рабочего дня.',
  },
  {
    question: 'Что делать, если я ошибся в реквизитах получателя?',
    answer:
      'Если статус перевода еще "В обработке", немедленно напишите в наш чат поддержки — мы сможем отменить операцию. Если перевод уже получил статус "Успешно", возврат средств невозможен, так как деньги зачислены на целевой счет.',
  },
  {
    question: 'Какие документы подходят для верификации аккаунта?',
    answer:
      'Мы принимаем развороты внутреннего или заграничного паспорта в хорошем качестве (четкое фото без бликов и обрезанных краев). Форматы: JPG, PNG или PDF, размер файла до 10 МБ.',
  },
];

export const SupportView = () => {
  return (
    <Workspace>
      <Typography variant="h2" as="h2">
        Поддержка
      </Typography>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="flex h-full w-full flex-col border-muted/40 shadow-lg">
          <CardHeader className="space-y-px">
            <CardTitle className="flex items-center gap-2">
              <MessagesSquare className="h-4 w-4" />
              <Typography variant="h4" as="h4">
                Онлайн-чат
              </Typography>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <Typography variant="description" as="span">
              Самый быстрый способ получить помощь. Операторы онлайн
              круглосуточно.
            </Typography>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Начать чат в приложении</Button>
          </CardFooter>
        </Card>
        <Card className="flex h-full w-full flex-col border-muted/40 shadow-lg">
          <CardHeader className="space-y-px">
            <CardTitle className="flex items-center gap-2">
              <LayoutPanelLeft className="h-4 w-4" />
              <Typography variant="h4" as="h4">
                Альтернативные каналы
              </Typography>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 gap-2">
            {mockSocial.map(({ id, name, href }) => (
              <div key={id} className={`flex items-center p-0 text-sm`}>
                <a
                  href={href}
                  target="_blank"
                  className="flex items-center gap-1 font-semibold text-primary transition-all hover:underline"
                >
                  <Typography
                    variant="body"
                    as="span"
                    className="font-semibold text-primary"
                  >
                    Написать в {name}
                  </Typography>{' '}
                  <MoveRight className="h-4 w-4" />
                </a>
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <hr className="w-full border-t border-border" />
            <div className="flex w-full items-center gap-1">
              <Typography variant="hint" as="span">
                Email:{' '}
              </Typography>
              <Typography variant="description" as="span">
                support@flymoney.com
              </Typography>
            </div>
          </CardFooter>
        </Card>
        <Card className="flex h-full w-full flex-col border-muted/40 shadow-lg">
          <CardHeader className="space-y-px">
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <Typography variant="h4" as="h4">
                Статус систем
              </Typography>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 gap-2">
            <Typography variant="description" as="span">
              Мониторинг шлюзов и направлений переводов.
            </Typography>

            {mockStatus.map(({ id, label, status, text }) => (
              <div
                key={id}
                className={`flex w-full items-center justify-between gap-2`}
              >
                <Typography variant="body" as="div" className="text-[10px]">
                  {label}
                </Typography>
                <Typography
                  variant="hint"
                  as="span"
                  className={`${
                    status === 'success' ? 'text-primary' : 'text-amber-500'
                  }`}
                >
                  {text}
                </Typography>
              </div>
            ))}
          </CardContent>
          <CardFooter className="w-full justify-end-safe text-[10px] text-muted-foreground italic">
            Обновлено 1 мин назад
          </CardFooter>
        </Card>
      </div>

      {/* FAQ */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            <Typography variant="h3" as="h3">
              Часто задаваемые вопросы
            </Typography>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion multiple>
            {mockFaqItems.map(({ question, answer }) => (
              <AccordionItem key={question} value={question}>
                <AccordionTrigger className="cursor-pointer font-semibold hover:text-primary hover:no-underline">
                  {question}
                </AccordionTrigger>
                <AccordionContent>{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </Workspace>
  );
};
