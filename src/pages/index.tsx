import {
  AreaChart,
  Callout,
  Card,
  DonutChart,
  Flex,
  Grid,
  Tab,
  TabList,
  Text,
  Title,
} from "@tremor/react";
import { useEffect, useState } from "react";
import IPessoa from "../interfaces/IPessoa";
import { usePessoa } from "./api/catarina.api";
import { format, isAfter, isBefore, subDays } from "date-fns";

type Sexo = {
  tipo: string;
  quantidade: number;
};

type Relatorio = {
  date: string;
  masculino: number;
  feminino: number;
};

interface DadosPorData {
  [data: string]: { masculino: number; feminino: number };
}

const chartdata: Relatorio[] = [];
const DATA_FILTRO = 30;

export default function Home() {
  const [selectedView, setSelectedView] = useState("1");
  const [pessoas, setPessoas] = useState<IPessoa[]>();

  const { pessoaData, pessoaIsLoading, pessoaError } = usePessoa();

  useEffect(() => {
    if (pessoaData) {
      setPessoas(pessoaData);
    }
  }, [pessoaData]);

  if (!pessoas) {
    return (
      <div>
        <h2>carregando pessoas ... </h2>
      </div>
    );
  }

  let sexoM = 0;
  let sexoF = 0;

  const resultado = pessoas.reduce(
    (acumulador: DadosPorData, registro: IPessoa) => {
      const { nome, sexo, createdAt } = registro;
      const data = new Date(createdAt).toLocaleDateString();

      if (!acumulador[data]) {
        acumulador[data] = { masculino: 0, feminino: 0 };
      }

      if (sexo === "m") {
        acumulador[data].masculino += 1;
      } else if (sexo === "f") {
        acumulador[data].feminino += 1;
      }

      return acumulador;
    },
    {}
  );

  pessoas.map((pessoaData) => {
    if (pessoaData.sexo === "m") {
      sexoM++;
    } else {
      sexoF++;
    }
  });
  const sexoDasPessoas: Sexo[] = [];
  sexoDasPessoas.push(
    {
      tipo: "Masculino",
      quantidade: sexoM,
    },
    {
      tipo: "Feminino",
      quantidade: sexoF,
    }
  );

  if (chartdata.length === 0) {
    const hoje = new Date();
    for (let i = 0; i < DATA_FILTRO; i++) {
      const data = subDays(hoje, i);
      const dataFormatada = format(data, "dd/MM/yyyy");

      if (resultado[dataFormatada]) {
        chartdata.push({
          date: dataFormatada,
          masculino: resultado[dataFormatada].masculino,
          feminino: resultado[dataFormatada].feminino,
        });
      } else {
        chartdata.push({
          date: dataFormatada,
          masculino: 0,
          feminino: 0,
        });
      }
    }
  }

  return (
    <main className="bg-slate-50 p-6 sm:p-10">
      <Title>Brasileirinhos</Title>
      <Text>Gerenciamento e cadastro de pessoas.</Text>

      <TabList
        defaultValue="1"
        className="mt-6"
        onValueChange={(value) => setSelectedView(value)}
      >
        <Tab value={"1"} text={"Dashboard"} />
        <Tab value={"2"} text={"Administrativo"} />
      </TabList>

      {selectedView === "1" ? (
        <>
          <Grid numColsLg={3} className="mt-6 gap-6">
            <Card className="max-w-lg">
              <Title className="text-center">Pessoas / Sexo</Title>
              <DonutChart
                className="mt-6"
                data={sexoDasPessoas}
                category="quantidade"
                index="tipo"
                colors={["blue", "fuchsia"]}
              />
              <Callout title="Observação" color="yellow" className="mt-3">
                Se o sexo não for informado no cadastro, o padrão é MASCULINO
              </Callout>
            </Card>
            <Card className="max-w-lg">
              <Title className="text-center">Usuarios POST</Title>
              <DonutChart
                className="mt-6"
                data={sexoDasPessoas}
                category="quantidade"
                index="tipo"
                colors={["blue", "fuchsia"]}
              />
            </Card>
            <Card className="max-w-lg">
              <Title className="text-center">Usuarios GET</Title>
              <DonutChart
                className="mt-6"
                data={sexoDasPessoas}
                category="quantidade"
                index="tipo"
                colors={["blue", "fuchsia"]}
              />
            </Card>
          </Grid>

          <div className="mt-6">
            <Card>
              <Title>Cadastros de pessoas - Ultimos 30 dias</Title>
              <AreaChart
                className="h-72 mt-4"
                data={chartdata.slice().reverse()}
                index="date"
                categories={["feminino", "masculino"]}
                colors={["fuchsia", "blue"]}
              />
            </Card>
          </div>
        </>
      ) : (
        <Card className="mt-6">
          <div className="h-96" />
        </Card>
      )}
    </main>
  );
}
