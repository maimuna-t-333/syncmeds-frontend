'use client';

import { api } from "@/lib/config";
import { TApiResponse } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/lib/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Summary } from "lucide-react";

interface AnalyticsSummary{
    todaySales:number;
    monthlyRevenue:number;
    stockAlertsCount:number;
    expiringSoonCount:number;
}

export default function DashboardPage(){
    const {data:summary, isLoading, error}=useQuery<AnalyticsSummary>({
        queryKey:['analytics','summary'],
        queryFn:async()=>{
            const response:TApiResponse<AnalyticsSummary>=
           await api.get<AnalyticsSummary>('/analytics/summary');
        return response.data;
        },
    });

    if(isLoading){
        return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
    }

    if(error){
        return (
      <div className="p-4 text-red-600 bg-red-50 rounded-md">
        Failed to load dashboard data
      </div>
    );
    }

     const stats = [
    { title: "Today's Sales", value: summary?.todaySales?.toLocaleString() || '0', description: 'Total sales today' },
    { title: 'Monthly Revenue', value: `$${summary?.monthlyRevenue?.toLocaleString() || '0'}`, description: 'Revenue this month' },
    { title: 'Stock Alerts', value: summary?.stockAlertsCount?.toString() || '0', description: 'Low stock items' },
    { title: 'Expiring Soon', value: summary?.expiringSoonCount?.toString() || '0', description: 'Items expiring soon' },
    ];

     return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
        <p className="text-gray-500 dark:text-gray-400">Overview of your pharmacy performance</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-500">{stat.description}</p>
            </CardContent>
          </Card>
          ))}
      </div>
    </div>
  );
}