import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { memo } from "react";
import type { PricePoint } from "../../types";

interface Props {
  data: PricePoint[];
  symbol: string;
  priceRange: { min: number; max: number };
  isPositive?: boolean;
}

const PriceChart = memo(({ data, symbol, priceRange, isPositive = true }: Props) => {
  const lineColor = isPositive ? '#10B981' : '#EF4444';
  
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="time"
            tick={{ fill: "#9CA3AF", fontSize: 11 }}
            tickLine={false}
            interval="preserveEnd"
            minTickGap={50}
          />
          <YAxis
            domain={[priceRange.min, priceRange.max]}
            tick={{ fill: "#9CA3AF", fontSize: 11 }}
            tickLine={false}
            tickFormatter={(v) => `$${v.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
            width={80}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "none",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "#9CA3AF" }}
            formatter={(value: number | undefined) => [
              value !== undefined ? `$${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}` : "N/A",
              symbol,
            ]}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke={lineColor}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
});

PriceChart.displayName = 'PriceChart';

export default PriceChart;
