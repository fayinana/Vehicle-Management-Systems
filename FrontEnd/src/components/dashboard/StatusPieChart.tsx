import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatusPieChartProps {
  data: Array<{ status: string; count: number }>;
}

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--destructive))",
  "hsl(var(--accent))",
  "hsl(var(--warning))",
  "hsl(var(--info))",
];

const StatusPieChart = ({ data }: StatusPieChartProps) => {
  const total = data.reduce((sum, item) => sum + item.count, 0);
  const emptyData = data.length === 0;

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
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                labelLine={false}
                label={({ name, value }) =>
                  `${name}: ${((value / total) * 100).toFixed(1)}%`
                }
                dataKey="count"
                nameKey="status"
                paddingAngle={5}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    className="dark:opacity-80"
                  />
                ))}
              </Pie>
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
                formatter={(value: number, name: string) => [
                  value,
                  name.charAt(0).toUpperCase() + name.slice(1),
                ]}
              />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                formatter={(value) => (
                  <span className="dark:text-gray-400">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default StatusPieChart;
