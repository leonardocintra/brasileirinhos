import {
  BadgeDelta,
  Card,
  Flex,
  Grid,
  Metric,
  ProgressBar,
  Tab,
  TabList,
  Text,
  Title,
} from "@tremor/react";
import { useState } from "react";

export default function Home() {
  const [selectedView, setSelectedView] = useState("1");

  return (
    <main className="bg-slate-50 p-6 sm:p-10">
      <Title>Brasileirinhos</Title>
      <Text>Gerenciamento e cadastro de pessoas.</Text>

      <TabList
        defaultValue="1"
        className="mt-6"
        onValueChange={(value) => setSelectedView(value)}
      >
        <Tab value={"1"} text={"Cadastro"} />
        <Tab value={"2"} text={"Gerenciamento"} />
      </TabList>

      {selectedView === "1" ? (
        <>
          <Grid numColsLg={3} className="mt-6 gap-6">
            <Card className="max-w-lg">
              <Flex alignItems="start">
                <div>
                  <Text>Sales</Text>
                  <Metric>$ 12,699</Metric>
                </div>
                <BadgeDelta deltaType="moderateIncrease">13.2%</BadgeDelta>
              </Flex>
              <Flex className="mt-4">
                <Text className="truncate">68% ($ 149,940)</Text>
                <Text> $ 220,500 </Text>
              </Flex>
              <ProgressBar percentageValue={15.9} className="mt-2" />
            </Card>
            <Card className="max-w-lg">
              <Flex alignItems="start">
                <div>
                  <Text>Sales</Text>
                  <Metric>$ 12,699</Metric>
                </div>
                <BadgeDelta deltaType="moderateIncrease">13.2%</BadgeDelta>
              </Flex>
              <Flex className="mt-4">
                <Text className="truncate">68% ($ 149,940)</Text>
                <Text> $ 220,500 </Text>
              </Flex>
              <ProgressBar percentageValue={15.9} className="mt-2" />
            </Card>
            <Card className="max-w-lg">
              <Flex alignItems="start">
                <div>
                  <Text>Sales</Text>
                  <Metric>$ 12,699</Metric>
                </div>
                <BadgeDelta deltaType="moderateIncrease">13.2%</BadgeDelta>
              </Flex>
              <Flex className="mt-4">
                <Text className="truncate">68% ($ 149,940)</Text>
                <Text> $ 220,500 </Text>
              </Flex>
              <ProgressBar percentageValue={15.9} className="mt-2" />
            </Card>
          </Grid>

          <div className="mt-6">
            <Card>
              <div className="h-80" />
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
