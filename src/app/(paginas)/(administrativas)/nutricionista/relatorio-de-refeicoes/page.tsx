"use client"

import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from 'next/navigation';
import * as Form from '@radix-ui/react-form';

import { Secao } from "@/app/elementos/basicos/Secao";
import { CabecalhoDeSecao } from "@/app/elementos/basicos/CabecalhoDeSecao";
import { Botao } from "@/app/elementos/basicos/Botao";
import { TabelaDeCrud } from "@/app/elementos/modulos/comuns/TabelaDeCrud/TabelaDeCrud";
import { createColumnHelper } from "@tanstack/react-table";
import { DatasHelper } from "@/app/lib/elementos/DatasHelper";
import { buscarRelatorioDeRefeicoes } from "@/app/actions/nutricionista";
import { StatusDaRefeicao } from "@/app/elementos/basicos/StatusDaRefeicao";
import { TRelatorioDeRefeicoes } from "@/app/interfaces/TRelatorioDeRefeicoes";

export default function NutricionistaPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [datas, setDatas] = useState({
    dataInicial: searchParams.get('dataInicial') || DatasHelper.getDataDeHoje(),
    dataFinal: searchParams.get('dataFinal') || DatasHelper.getDataDeHoje()
  });

  const { data: dadosDaTabela, isFetching: isLoadingDadosDaTabela, refetch } = useQuery({
    queryKey: ['relatorioDeRefeicoes', datas],
    queryFn: async () => {
      const resposta = await buscarRelatorioDeRefeicoes({ data_inicial: datas.dataInicial, data_final: datas.dataFinal });
      return resposta.sucesso ? resposta.resposta : [];
    },
    initialData: []
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const dataInicial = formData.get('dataInicial') as string;
    const dataFinal = formData.get('dataFinal') as string;

    const urlAtual = new URL(window.location.href);
    urlAtual.searchParams.set('dataInicial', dataInicial);
    urlAtual.searchParams.set('dataFinal', dataFinal);

    setDatas({ dataInicial, dataFinal });
    router.push(urlAtual.toString());
    refetch();
  };

  const colunasHelper = createColumnHelper<typeof dadosDaTabela[number]>();

  const colunas = useMemo(() => [
    colunasHelper.accessor('id', {
      cell: props => props.getValue(),
      header: 'ID',
      meta: { filterVariant: 'range' }
    }),
    colunasHelper.accessor('name', {
      cell: props => <p className='text-left'>{props.getValue()}</p>,
      header: 'Estudante',
    }),
    colunasHelper.accessor('meal_description', {
      cell: props => props.getValue(),
      header: 'Refeição',
    }),
    colunasHelper.accessor('date', {
      cell: props => props.getValue(),
      header: 'Data',
    }),
    colunasHelper.accessor('initials', {
      cell: props => props.getValue(),
      header: 'Curso',
    }),
    {
      id: 'Status',
      accessorFn: (props: TRelatorioDeRefeicoes) => {
        return pegarStatusDaRefeicao(props).tipo;
      },
      cell: (props: any) => {
        return <div className="flex justify-center">
          {pegarStatusDaRefeicao(props.row.original).elemento}
        </div>
      }
    }
  ], []);

  const pegarStatusDaRefeicao = (refeicao: TRelatorioDeRefeicoes): { tipo: string, elemento: React.ReactNode } => {
    if (refeicao.wasPresent) return {
      tipo: "Utilizado",
      elemento: <StatusDaRefeicao cor="verde-300" icone="circulo-check" texto="Utilizado" textoTooltip="A refeição foi reservada e o ticket já foi utilizado." />
    }

    if (refeicao.canceled_by_student) return {
      tipo: "Cancelado",
      elemento: <StatusDaRefeicao cor="vermelho-400" icone="tag-x" texto="Cancelado" textoTooltip="Esta reserva foi cancelada." />
    }

    if (refeicao.absenceJustification) return {
      tipo: "Justificado",
      elemento: <StatusDaRefeicao cor="azul-400" icone="circulo-check" texto="Justificado" textoTooltip={`A ausência a esta refeição foi justificada. Justificativa: ${refeicao.studentJustification}`} />
    }

    if (!refeicao.absenceJustification) return {
      tipo: "Ausente",
      elemento: <StatusDaRefeicao cor="vermelho-400" icone="circulo-x" texto="Ausente" textoTooltip="A pessoa reservou mas não esteve presente nesta refeição. É necessário justificar a ausência." />
    }

    return {
      tipo: "Disponível",
      elemento: <StatusDaRefeicao cor="amarelo-200" icone="circulo-check" texto="Disponível" textoTooltip="A refeição foi reservada e o ticket ainda pode ser utilizado." />
    }
  }

  return (
    <Secao className="border-none">
      <Secao className="max-w-[1440px] mx-auto flex flex-col gap-y-4">
        <CabecalhoDeSecao titulo="Relatório de refeições" />
        <Secao className="flex flex-wrap gap-y-2">
          <div className="flex gap-x-4 items-end">
            <Form.Root className="flex gap-x-2 items-end" onSubmit={handleSubmit}>
              <Form.Field name="dataInicial" className="flex flex-col gap-y-2">
                <Form.Label className="font-bold">
                  Data Inicial
                </Form.Label>
                <Form.Control type="date" className="px-2 py-1 rounded outline outline-1 outline-cinza-600" defaultValue={datas.dataInicial} />
              </Form.Field>
              <Form.Submit />
              <Form.Field name="dataFinal" className="flex flex-col gap-y-2">
                <Form.Label className="font-bold">
                  Data Final
                </Form.Label>
                <Form.Control type="date" className="px-2 py-1 rounded outline outline-1 outline-cinza-600" defaultValue={datas.dataFinal} />
              </Form.Field>
              <Form.Submit />
              <Botao variante="adicionar" texto="Buscar" className="h-[36px] py-0 px-10" type='submit' />
            </Form.Root>
          </div>
        </Secao>
        <Secao>
          <TabelaDeCrud colunas={colunas} dados={dadosDaTabela ?? []} estaCarregando={isLoadingDadosDaTabela} />
        </Secao>
      </Secao>
    </Secao>
  );
}