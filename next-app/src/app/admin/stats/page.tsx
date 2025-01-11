"use client";
import React from "react";
import useFetch from "@/hooks/useFetch";
import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  Tooltip as RechartsTooltip,
  Rectangle,
  Pie,
  PieChart,
  Sector,
} from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const LangConfig = {
  types: {
    label: "Types",
    color: "hsl(var(--chart-1))",
  },
  languages: {
    label: "Languages",
    color: "hsl(var(--chart-1))",
  },
};

const provConfig = {
  providers: {
    label: "Providers",
    color: "hsl(var(--chart-2))",
  },
};

const typeConfig = {
  types: {
    label: "types",
    color: "hsl(var(--chart-2))",
  },
};


const Page = () => {
  const { data: res } = useFetch("/api/admin/stats", "stats");
  const languages = res?.data?.languages || [];
  const providers = res?.data?.providers || [];
  const types = res?.data?.projectTypes || [];

  const languageChartData = languages.map(
    (lang: { name: string; count: number }, index: number) => ({
      name: lang.name,
      count: lang.count,
      fill: `hsl(var(--chart-${(index % 5) + 1}))`,
    })
  );

  const providersData = providers.map(
    (provider: { name: string; count: number }, index: number) => ({
      name: provider.name,
      count: provider.count,
      fill: `hsl(var(--chart-${(index % 5) + 1}))`,
    })
  );

  const typeData = types.map(
    (type: { name: string; count: number }, index: number) => ({
      name: type.name,
      count: type.count,
      fill: `hsl(var(--chart-${(index % 5) + 1}))`,
    })
  );

  return (
    <div className="mt-10 sm:mt-20 w-full space-y-10">
      {/* Total Users and Total Projects */}
      <div className="flex gap-4">
        <div className="size-32 rounded-xl bg-chart-1 flex flex-col items-center justify-center">
          <span className="text-4xl">{res?.data?.totalUsers}</span>
          <span>Total Users</span>
        </div>
        <div className="size-32 rounded-xl bg-chart-2 flex flex-col items-center justify-center">
          <span className="text-4xl">{res?.data?.totalProjects}</span>
          <span>Total Projects</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="flex flex-col">
          <CardHeader className="items-center">
            <CardTitle>Most Used Project Types & Languages</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <ChartContainer
              config={LangConfig}
              className="mx-auto aspect-square max-h-[300px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />} />
                <Pie data={languageChartData} dataKey="count" nameKey="name" outerRadius="70%" />
                <Pie
                  data={typeData}
                  dataKey="count"
                  nameKey="name"
                  innerRadius="80%"
                  outerRadius="100%"
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="leading-none text-muted-foreground">
              Showing projects count by types and languages
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Providers Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={provConfig}>
              <BarChart accessibilityLayer data={providersData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="count" fill="var(--color-desktop)" radius={8} />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="leading-none text-muted-foreground">
              Showing account count by providers
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Page;
