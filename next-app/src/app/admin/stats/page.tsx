"use client";
import React from "react";
import useFetch from "@/hooks/useFetch";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  Pie,
  PieChart,
} from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";

const LangConfig = {
  types: {
    label: "Types",
    color: "var(--chart-1)",
  },
  languages: {
    label: "Languages",
    color: "var(--chart-1)",
  },
};

const provConfig = {
  providers: {
    label: "Providers",
    color: "var(--chart-2)",
  },
};

const Page = () => {
  const { data: res, isError, error, loading } = useFetch("/api/admin/stats", "stats");
  const languages = res?.data?.languages || [];
  const providers = res?.data?.providers || [];
  const types = res?.data?.projectTypes || [];

  if (isError) {
    return <div className="text-center text-3xl font-light">{error?.message}</div>
  }

  if (loading) {
    return (
      <div className="space-y-10">
        <div className="flex gap-4">
          {Array.from({ length: 4 }).map((_, idx) => {
            return (
              <Skeleton key={idx} className="size-32 rounded-xl grow" />
            );
          })}
        </div>
        <div className="flex flex-wrap gap-5 w-full">
          {Array.from({ length: 2 }).map((_, idx) => {
            return (
              <div key={idx} className="w-full sm:w-auto grow flex flex-col p-5 gap-8 items-center justify-between h-fit sm:h-[30rem] border rounded-xl">
                <Skeleton className="h-10 w-11/12" />
                <Skeleton className="h-56 sm:h-3/4 w-11/12" />
                <Skeleton className="h-5 w-3/4" />
              </div>
            )
          })}
        </div>
      </div>
    );
  }


  const languageChartData = languages.map(
    (lang: { name: string; count: number }, index: number) => ({
      name: lang.name,
      count: lang.count,
      fill: `var(--chart-${(index % 5) + 1})`,
    })
  );

  const providersData = providers.map(
    (provider: { name: string; count: number }, index: number) => ({
      name: provider.name,
      count: provider.count,
      fill: `var(--chart-${(index % 5) + 1})`,
    })
  );

  const typeData = types.map(
    (type: { name: string; count: number }, index: number) => ({
      name: type.name,
      count: type.count,
      fill: `var(--chart-${(index % 5) + 1})`,
    })
  );

  const counts = [{
    name: 'Total Users',
    count: res.data.totalUsers,
    color: 'bg-chart-1',
  }, {
    name: 'Total Projects',
    count: res.data.totalProjects,
    color: 'bg-chart-2',
  }, {
    name: 'Total Inquiries',
    count: res.data.totalInquiries,
    color: 'bg-chart-3',
  }, {
    name: 'Total Blogs',
    count: res.data.totalBlogs,
    color: 'bg-chart-4',
  }]

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-4 gap-2 sm:gap-4">
        {counts.map((item, idx) => {
          return (
            <div key={idx} className={`p-2 h-24 sm:h-32 rounded-xl text-white ${item.color} flex flex-col text-center items-center justify-center`}>
              <span className="text-2xl sm:text-4xl font-bold">{item.count}</span>
              <span className="text-sm sm:text-base">{item.name}</span>
            </div>)
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="flex flex-col">
          <CardHeader className="items-center">
            <CardTitle>Most Used Project Types & Languages</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <ChartContainer
              config={LangConfig}
              className="mx-auto aspect-square max-h-[400px]"
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
          <CardHeader className="text-center">
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
          <CardFooter className="flex-col gap-2 text-sm">
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
