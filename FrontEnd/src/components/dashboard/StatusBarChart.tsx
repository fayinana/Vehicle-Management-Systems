import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatusBarChartProps {
  data: Array<{ status: string; count: number }>;
}

const StatusBarChart = ({ data }: StatusBarChartProps) => {
  const defaultData = data || [];
  const emptyData = defaultData.length === 0;

  console.log(data);

  return (
    <Card className="dark:border-gray-800">
      <CardHeader>
        <CardTitle>Status Overview</CardTitle>
      </CardHeader>
      <CardContent className="h-[350px]">
        {emptyData ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500">No data available</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={defaultData}>
              <CartesianGrid
                strokeDasharray="3 3"
                className="dark:stroke-gray-700"
              />
              <XAxis
                dataKey="status"
                className="dark:fill-gray-400"
                tickLine={false}
                axisLine={{ stroke: "var(--border)" }}
              />
              <YAxis
                className="dark:fill-gray-400"
                tickLine={false}
                axisLine={{ stroke: "var(--border)" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--background)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
                labelStyle={{
                  color: "var(--foreground)",
                  fontWeight: "bold",
                }}
                itemStyle={{
                  color: "var(--foreground)",
                }}
                formatter={(value: number, name: string) => [
                  value,
                  name.charAt(0).toUpperCase() + name.slice(1),
                ]}
              />
              <Legend
                verticalAlign="top"
                wrapperStyle={{ top: 0 }}
                formatter={(value) => (
                  <span className="dark:text-gray-400">{value}</span>
                )}
              />
              <Bar
                dataKey="count"
                fill="url(#gradient)"
                radius={[10, 10, 0, 0]}
                animationDuration={500}
              />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--primary-light))" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default StatusBarChart;
