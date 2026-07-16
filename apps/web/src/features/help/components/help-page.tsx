import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

import {
  CUP_PHASE_MULTIPLIERS,
  FAQ_ITEMS,
  HOW_IT_WORKS,
  PREDICTION_RULES,
  SCORING_EXAMPLES,
  SCORING_RULES,
  WORKFLOW_STEPS,
} from '../constants/help-content';
import { HelpFaq } from './help-faq';
import { HelpSection } from './help-section';
import { HelpSectionNav } from './help-section-nav';

const OVERVIEW_ITEMS = [
  {
    title: 'Campeonatos',
    text: 'Jogos reais importados (liga ou copa), também no fluxo de criar bolão.',
  },
  {
    title: 'Bolões',
    text: 'Grupos privados com convite, regras e classificação próprios.',
  },
  {
    title: 'Palpites',
    text: 'Só placar, até 10 min antes do jogo. Os outros ficam ocultos até o prazo.',
  },
  {
    title: 'Pontuação',
    text: 'Calculada automaticamente ao final de cada jogo.',
  },
  {
    title: 'Classificação',
    text: 'Mais pontos na frente; empate desempatado por ordem alfabética.',
  },
  {
    title: 'Personalização',
    text: 'Admin define e pode editar as regras de pontuação do bolão.',
  },
] as const;

export function HelpPage() {
  return (
    <div className='flex flex-col gap-6 pb-8'>
      <Card>
        <CardHeader>
          <CardTitle className='text-xl'>{HOW_IT_WORKS.title}</CardTitle>
          <CardDescription>
            Guia completo para participantes e administradores de bolões.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-3'>
          {HOW_IT_WORKS.paragraphs.map(paragraph => (
            <p
              key={paragraph}
              className='text-muted-foreground text-sm leading-relaxed'
            >
              {paragraph}
            </p>
          ))}
        </CardContent>
      </Card>

      <HelpSectionNav />

      <HelpSection
        id='como-funciona'
        title='Visão geral'
        description='Entenda o fluxo principal da plataforma.'
      >
        <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
          {OVERVIEW_ITEMS.map(item => (
            <Card key={item.title} size='sm'>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.text}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </HelpSection>

      <HelpSection
        id='passo-a-passo'
        title='Passo a passo'
        description='Do cadastro à disputa pelo topo da classificação.'
      >
        <ol className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
          {WORKFLOW_STEPS.map(step => (
            <li key={step.step}>
              <Card size='sm' className='h-full'>
                <CardContent className='flex gap-3'>
                  <span className='bg-primary text-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold'>
                    {step.step}
                  </span>
                  <div className='space-y-1'>
                    <p className='font-medium'>{step.title}</p>
                    <p className='text-muted-foreground text-sm leading-relaxed'>
                      {step.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>
      </HelpSection>

      <HelpSection
        id='regras-palpite'
        title='Regras de palpite'
        description='O que você precisa saber antes de enviar um palpite.'
      >
        <div className='grid gap-3 sm:grid-cols-2'>
          {PREDICTION_RULES.map(rule => (
            <Card key={rule.title} size='sm'>
              <CardHeader>
                <CardTitle>{rule.title}</CardTitle>
                <CardDescription className='leading-relaxed'>
                  {rule.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </HelpSection>

      <HelpSection
        id='pontuacao'
        title='Regras de pontuação'
        description='Valores padrão do sistema. O administrador do bolão pode personalizá-los. Então abaixo segue exemplo de como funciona a pontuação.'
      >
        <Card size='sm'>
          <CardContent className='overflow-x-auto p-0'>
            <Table>
              <TableHeader>
                <TableRow className='hover:bg-transparent'>
                  <TableHead>Regra</TableHead>
                  <TableHead className='w-24 text-center'>Pontos</TableHead>
                  <TableHead>Descrição</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {SCORING_RULES.map(rule => (
                  <TableRow key={rule.key}>
                    <TableCell className='font-medium'>{rule.label}</TableCell>
                    <TableCell className='text-center'>
                      <Badge variant='secondary'>{rule.points}</Badge>
                    </TableCell>
                    <TableCell className='text-muted-foreground'>
                      {rule.description}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </HelpSection>

      <HelpSection
        id='exemplos'
        title='Exemplos práticos'
        description='Veja como a pontuação é calculada em situações reais (valores padrão).'
      >
        <div className='grid gap-4 lg:grid-cols-2'>
          {SCORING_EXAMPLES.map(example => (
            <Card key={example.id} size='sm' className='h-full'>
              <CardHeader>
                <div className='flex flex-wrap items-start justify-between gap-2'>
                  <CardTitle>{example.title}</CardTitle>
                  <Badge
                    className={cn(
                      example.total > 0
                        ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400'
                        : 'bg-muted text-muted-foreground',
                    )}
                  >
                    {example.total} pts
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className='space-y-3'>
                <div className='grid gap-3 sm:grid-cols-2'>
                  <Card size='sm' className='bg-muted/30 shadow-none'>
                    <CardHeader className='pb-2'>
                      <CardDescription className='text-xs font-medium uppercase tracking-wide'>
                        Resultado real
                      </CardDescription>
                      <CardTitle className='text-base font-medium'>
                        {example.result}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                  <Card size='sm' className='bg-muted/30 shadow-none'>
                    <CardHeader className='pb-2'>
                      <CardDescription className='text-xs font-medium uppercase tracking-wide'>
                        Seu palpite
                      </CardDescription>
                      <CardTitle className='text-base font-medium'>
                        {example.prediction}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </div>
                <ul className='text-muted-foreground space-y-1 text-sm'>
                  {example.breakdown.map(item => (
                    <li key={item} className='flex items-center gap-2'>
                      <span className='bg-primary size-1.5 shrink-0 rounded-full' />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className='text-muted-foreground text-sm italic'>
                  {example.note}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </HelpSection>

      <HelpSection
        id='copas'
        title='Campeonatos mata-mata (copas)'
        description='Em copas, fases eliminatórias multiplicam o total de pontos da partida.'
      >
        <div className='space-y-4'>
          <Card size='sm'>
            <CardContent className='overflow-x-auto p-0'>
              <Table>
                <TableHeader>
                  <TableRow className='hover:bg-transparent'>
                    <TableHead>Fase</TableHead>
                    <TableHead className='w-32 text-center'>
                      Multiplicador
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {CUP_PHASE_MULTIPLIERS.map(phase => (
                    <TableRow key={phase.phase}>
                      <TableCell>{phase.phase}</TableCell>
                      <TableCell className='text-center'>
                        <Badge variant='secondary'>×{phase.multiplier}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card size='sm' className='bg-muted/30'>
            <CardContent>
              <p className='text-muted-foreground text-sm leading-relaxed'>
                Exemplo: placar exato (10 pts) na semi-final (×5) ={' '}
                <strong className='text-foreground'>50 pts</strong>. A fase de
                grupos usa multiplicador ×1, ou seja, mesmas regras de uma
                liga.
              </p>
            </CardContent>
          </Card>
        </div>
      </HelpSection>

      <HelpSection
        id='duvidas'
        title='Perguntas frequentes'
        description={`${FAQ_ITEMS.length} dúvidas comuns de participantes e administradores.`}
      >
        <HelpFaq />
      </HelpSection>
    </div>
  );
}
