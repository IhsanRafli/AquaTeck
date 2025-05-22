
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Sector
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Course } from './CourseCard';
import { ChartBarBig } from 'lucide-react';

// Data pelajar kursus (simulasi)
const levelUsersData = {
  'Pemula': 580,
  'Menengah': 420,
  'Lanjutan': 240
};

interface CourseStatsChartProps {
  courses: Course[];
}

const CourseStatsChart = ({ courses }: CourseStatsChartProps) => {
  // Hitung jumlah kursus per level
  const levelCounts = courses.reduce<Record<string, number>>((counts, course) => {
    counts[course.level] = (counts[course.level] || 0) + 1;
    return counts;
  }, {});
  
  // Format data untuk chart
  const chartData = Object.entries(levelCounts).map(([level, count]) => ({
    level,
    courses: count,
    users: levelUsersData[level as keyof typeof levelUsersData] || 0
  }));

  // Colors for each level - using a more futuristic color scheme
  const levelColors = {
    'Pemula': '#33C3F0',    // bright cyan
    'Menengah': '#7E69AB',  // purple
    'Lanjutan': '#00E5FF'   // electric blue
  };
  
  // Konfigurasi warna untuk chart
  const chartConfig = {
    courses: {
      label: "Jumlah Kursus",
      color: "#33C3F0"  // bright cyan
    },
    users: {
      label: "Jumlah Pengguna",
      color: "#7E69AB"  // purple
    }
  };

  const pieData = chartData.map(item => ({
    name: item.level,
    value: item.users,
    fill: levelColors[item.level as keyof typeof levelColors]
  }));

  return (
    <div className="w-full bg-[#0a1929] p-6 rounded-lg shadow-xl border border-[#1e3a5f] text-white">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-medium text-cyan-400">
          <ChartBarBig className="inline-block mr-2 h-5 w-5" />
          Statistik Kursus
        </h3>
        <div className="text-xl font-bold text-cyan-300">
          {Object.values(levelUsersData).reduce((sum, value) => sum + value, 0)} Pengguna
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#0d203a] rounded-lg p-4 h-64">
          <ChartContainer config={chartConfig}>
            <BarChart 
              data={chartData}
              barSize={32}
              barGap={8}
              style={{ background: 'linear-gradient(180deg, #0d203a 0%, #0a1929 100%)' }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" vertical={false} />
              <XAxis 
                dataKey="level" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#a0aec0', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#a0aec0', fontSize: 12 }}
              />
              <Tooltip 
                content={<ChartTooltipContent />} 
                wrapperStyle={{ 
                  backgroundColor: '#0d203a', 
                  border: '1px solid #1e3a5f',
                  borderRadius: '8px' 
                }}
              />
              <Bar 
                dataKey="courses" 
                radius={[4, 4, 0, 0]} 
                fill="var(--color-courses)" 
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={levelColors[entry.level as keyof typeof levelColors]}
                    opacity={0.9}
                  />
                ))}
              </Bar>
              <Bar 
                dataKey="users" 
                radius={[4, 4, 0, 0]} 
                fill="var(--color-users)"
              />
            </BarChart>
          </ChartContainer>
        </div>
        
        <div className="bg-[#0d203a] rounded-lg p-4 flex items-center justify-center">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value} Pengguna`, name]}
                contentStyle={{ 
                  backgroundColor: '#0d203a', 
                  border: '1px solid #1e3a5f',
                  borderRadius: '8px',
                  color: '#ffffff'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-3 gap-4">
        {Object.entries(levelUsersData).map(([level, users], index) => {
          const color = levelColors[level as keyof typeof levelColors];
          return (
            <div key={level} className="text-center p-3 rounded-md bg-[#0d203a] border border-[#1e3a5f]">
              <div className="text-sm font-medium" style={{ color }}>{level}</div>
              <div className="text-lg font-semibold text-white">{users} Pengguna</div>
              <div className="text-sm text-gray-400">{levelCounts[level] || 0} Kursus</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseStatsChart;
