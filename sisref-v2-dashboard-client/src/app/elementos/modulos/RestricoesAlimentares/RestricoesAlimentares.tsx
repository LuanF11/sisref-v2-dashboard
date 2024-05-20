"use client"

import React, { Suspense } from "react"

import { useEffect, useState } from "react"
import { Botao } from "../../basicos/Botao"
import { CabecalhoDeSecao } from "../../basicos/CabecalhoDeSecao"
import { Secao } from "../../basicos/Secao"
import { TextoDescritivo } from "./TextoDescritivo"
import { RestricaoAlimentar } from "../../basicos/RestricaoAlimentar"
import { Skeleton } from "@mui/material"

const TEMPO_DE_CARREGAMENTO = 2000

export const RestricoesAlimentares = ({ forcarExibicao = false }: { forcarExibicao?: boolean }) => {
    const [restricoes, setRestricoes] = useState<string[]>([])
    const [carregando, setCarregando] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setRestricoes(["Glúten", "Lactose", "Frutos do mar"])

            setCarregando(false)
        }, TEMPO_DE_CARREGAMENTO)
    }, [])

    const handleAdicionarRestricao = () => {
        const restricao = prompt("Digite a restrição alimentar que deseja adicionar")
        if (!restricao) return

        setRestricoes([...restricoes, restricao])
    }

    const handleRemoverRestricao = (e: React.MouseEvent) => {
        const restricao = e.currentTarget?.parentElement?.previousSibling?.textContent
        if (!restricao) return

        setRestricoes(restricoes.filter(item => item !== restricao))
    }

    return (
        <div className={`${forcarExibicao ? "flex" : "hidden"} lg:flex flex-col gap-4 `}>
            <TextoDescritivo />
            <Secao className="flex flex-col gap-4">
                <CabecalhoDeSecao titulo="Suas restrições alimentares" />
                {
                    carregando ?
                        <LoadingSkeletons /> :
                        restricoes.map((item, index) => <RestricaoAlimentar key={index} texto={item} onRemove={handleRemoverRestricao} />)
                }
                <Botao texto="Adicionar" variante="adicionar" onClick={handleAdicionarRestricao} />
            </Secao>
        </div>
    )
}

const LoadingSkeletons = () => {
    return Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} variant="rounded" height={58} />)
}