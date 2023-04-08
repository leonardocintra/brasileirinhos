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

type Sexo = {
  tipo: string;
  quantidade: number;
};

type Relatorio = {
  date: string;
  masculino: number;
  feminino: number;
};

const chartdata = [
  {
    date: "Jan 22",
    SemiAnalysis: 2890,
    "The Pragmatic Engineer": 2338,
  },
  {
    date: "Feb 22",
    SemiAnalysis: 2756,
    "The Pragmatic Engineer": 2103,
  },
  {
    date: "Mar 22",
    SemiAnalysis: 3322,
    "The Pragmatic Engineer": 2194,
  },
  {
    date: "Apr 22",
    SemiAnalysis: 3470,
    "The Pragmatic Engineer": 2108,
  },
  {
    date: "May 22",
    SemiAnalysis: 3475,
    "The Pragmatic Engineer": 1812,
  },
  {
    date: "Jun 22",
    SemiAnalysis: 3129,
    "The Pragmatic Engineer": 1726,
  },
];

const relatorioCadatro: Relatorio[] = [];

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
  const dataLimite = new Date();
  dataLimite.setDate(dataLimite.getDate() - 90);


  const pessoasUltimosDias = pessoas.filter((p) => p.createdAt > dataLimite);
  pessoasUltimosDias.map((p) => {
    const cadastroLocaleDate = p.createdAt.toLocaleDateString();

    if (relatorioCadatro.filter((r) => r.date === cadastroLocaleDate)) {
      
    }

    relatorioCadatro.push({
      masculino: 1,
      feminino: 2,
      date: cadastroLocaleDate,
    });
  });

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

  const dataFormatter = (number: number) => {
    return "$ " + Intl.NumberFormat("us").format(number).toString();
  };

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
            <Card className="max-w-lg"></Card>
            <Card className="max-w-lg"></Card>
          </Grid>

          <div className="mt-6">
            <Card>
              <Title>Cadastros de pessoas</Title>
              <AreaChart
                className="h-72 mt-4"
                data={chartdata}
                index="date"
                categories={["SemiAnalysis", "The Pragmatic Engineer"]}
                colors={["indigo", "cyan"]}
                valueFormatter={dataFormatter}
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
