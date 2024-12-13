import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatusBarChartProps {
  data: Array<{ status: string; count: number }>;
}

const StatusBarChart = ({ data }: StatusBarChartProps) => {
  return (
    <Card className="dark:border-gray-800">
      <CardHeader>
        <CardTitle>Status Overview (Bar)</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="dark:stroke-gray-700" />
            <XAxis dataKey="status" className="dark:fill-gray-400" />
            <YAxis className="dark:fill-gray-400" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--background)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
              }}
              labelStyle={{
                color: 'var(--foreground)',
              }}
            />
            <Bar dataKey="count" fill="hsl(var(--primary))" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default StatusBarChart;