import { IApenasHorario, IApenasData, IHorarioEData } from "../interfaces/IHorarios";

type HorarioDaRefeicaoProps =
    | IApenasHorario
    | IApenasData
    | IHorarioEData;

const textoPorVariante = (props: HorarioDaRefeicaoProps) => {
    switch (props.variante) {
        case "horario":
            return `${props.horarios.timeStart}h às ${props.horarios.timeEnd}h`;
        case "data":
            return `${props.data}`;
        case "horario-e-data":
            return `${props.data} - ${props.horarios.timeStart}h às ${props.horarios.timeEnd}h`;
    }
}

export const HorarioDaRefeicao = (props: HorarioDaRefeicaoProps) => {
    return (
        <p className="text-cinza-600">
            {textoPorVariante(props)}
        </p>
    )
}