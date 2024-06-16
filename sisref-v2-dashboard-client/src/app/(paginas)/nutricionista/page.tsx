import React from "react";

import { RelatoriosDeDesperdicio } from "@/app/elementos/modulos/RelatoriosDeDesperdicio";
import { QuadroDeAvisos } from "@/app/elementos/modulos/QuadroDeAvisos";
import { Cardapios } from "@/app/elementos/modulos/Cardapios";
import BarChart from "@/app/elementos/componentes/BarChart";

interface NutricionistaPageProps {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

const searchParamsToURLSearchParams = (searchParams: { [key: string]: string | string[] | undefined }): URLSearchParams => {
  const urlSearchParams = new URLSearchParams()
  for (const key in searchParams) {
    if (searchParams[key] !== undefined) {
      urlSearchParams.set(key, searchParams[key] as string)
    }
  }
  return urlSearchParams
}

export default function NutricionistaPage({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  params,
  searchParams
}: NutricionistaPageProps) {

  // Sempre passar um novo objeto para evitar mutações
  const passarSearchParams = () => new URLSearchParams(searchParamsToURLSearchParams(searchParams).toString())

  return (
    <>
      <Cardapios searchParams={passarSearchParams()}/>
      <RelatoriosDeDesperdicio searchParams={passarSearchParams()} />
      <QuadroDeAvisos searchParams={passarSearchParams()} />
      <BarChart />
    </>
  );
}