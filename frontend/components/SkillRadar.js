import React from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer, 
  Tooltip 
} from 'recharts';

export default function SkillRadar({ data }) {
  const gridStroke = "#E2E8F0";
  const tickFill = "#475569";
  const tooltipBg = "#FFFFFF";
  const tooltipBorder = "#CBD5E1";
  const tooltipText = "#0F172A";
  const accentColor = "#0D9488";

  // If data is insufficient for a Radar chart, render a clean bar fallback
  if (!data || Object.keys(data).length < 3) {
    const entries = Object.entries(data || {}).slice(0, 6);
    return (
      <div className="w-full space-y-3 py-2">
        {entries.map(([skill, dna]) => {
          const avg = Math.round((dna.conceptual + dna.practical + dna.real_world) / 3);
          return (
            <div key={skill} className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-600">
                <span className="font-semibold text-slate-900">{skill}</span>
                <span className="font-mono font-medium text-teal-600">{avg}%</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div 
                  className="h-full bg-teal-600 rounded-full transition-all duration-700 ease-out" 
                  style={{ width: `${avg}%` }} 
                />
              </div>
            </div>
          );
        })}
        {entries.length === 0 && (
          <div className="text-center py-8 text-slate-400 text-xs italic">
            Insufficient competency data for radar visualization
          </div>
        )}
      </div>
    );
  }

  // Transform data for Recharts
  const chartData = Object.keys(data).map(skill => ({
    skill: skill.length > 14 ? skill.slice(0, 12) + '..' : skill,
    score: Math.round((data[skill].conceptual + data[skill].practical + data[skill].real_world) / 3),
    fullMark: 100,
  })).sort((a, b) => b.score - a.score).slice(0, 8);

  return (
    <div className="w-full h-64 -ml-1">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
          <PolarGrid stroke={gridStroke} strokeDasharray="3 3" />
          <PolarAngleAxis 
            dataKey="skill" 
            tick={{ fill: tickFill, fontSize: 11, fontWeight: 500 }} 
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 100]} 
            tick={false} 
            axisLine={false} 
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: tooltipBg,
              borderRadius: '10px', 
              border: `1px solid ${tooltipBorder}`, 
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
              fontSize: '12px',
              fontWeight: '500',
              color: tooltipText
            }} 
            itemStyle={{ color: accentColor }}
          />
          <Radar
            name="Proficiency"
            dataKey="score"
            stroke={accentColor}
            fill={accentColor}
            fillOpacity={0.2}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
