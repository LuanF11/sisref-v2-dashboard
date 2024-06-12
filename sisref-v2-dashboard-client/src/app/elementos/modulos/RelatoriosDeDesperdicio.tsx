import React from "react";

import { Botao } from "../basicos/Botao";
import { CabecalhoDeSecao } from "../basicos/CabecalhoDeSecao";
import { Secao } from "../basicos/Secao"
import { RelatorioDeDesperdicio } from "../componentes/RelatorioDeDespericio/RelatorioDeDesperdicio";
import { DatasHelper } from "@/app/lib/elementos/DatasHelper";
import { SliderServerSide } from "../componentes/SliderServerSide";

export const RelatoriosDeDesperdicio = ({ searchParams }: { searchParams: URLSearchParams }) => {
    let data = searchParams.get("dataRelatorio") || new Date().toISOString().split("T")[0];

    const localSearch = new URLSearchParams(searchParams.toString());

    // Resetar a data para o dia primeiro do mês
    data = data.split("-").slice(0, 2).join("-") + "-01";

    const anterior = DatasHelper.getMesAnterior(data);
    const posterior = DatasHelper.getMesPosterior(data);

    const handlePrevious: string = (searchParams.set("dataRelatorio", anterior), `/nutricionista?${searchParams.toString()}`);
    const handleNext: string = (searchParams.set("dataRelatorio", posterior), `/nutricionista?${searchParams.toString()}`);

    return (
        <Secao className="flex flex-col gap-y-4">
            <CabecalhoDeSecao titulo="Relatórios de desperdício" />
            <RelatorioDeDesperdicio variante="card" data={data} />
            <Botao variante="adicionar" texto="Adicionar relatório" />
            <SliderServerSide texto={DatasHelper.converterParaFormatoBrasileiro(data)} onNext={handleNext} onPrevious={handlePrevious} />
        </Secao>
    );
}