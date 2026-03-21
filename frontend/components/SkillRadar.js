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
  // If data is insufficient for a Radar chart, render a clean bar fallback
  if (!data || Object.keys(data).length < 3) {
    const entries = Object.entries(data || {}).slice(0, 6);
    return (
      <div className="w-full space-y-4 py-4 px-2">
        {entries.map(([skill, dna]) => {
          const avg = Math.round((dna.conceptual + dna.practical + dna.real_world) / 3);
          return (
            <div key={skill} className="group">
              <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 group-hover:text-indigo-500 transition-colors">
                <span>{skill}</span>
                <span>{avg}% Match</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: `${avg}%` }} 
                />
              </div>
            </div>
          );
        })}
        {entries.length === 0 && (
          <div className="text-center py-10 text-slate-400 text-xs italic">
            Insufficient DNA data for visualization
          </div>
        )}
      </div>
    );
  }

  // Transform data for Recharts
  const chartData = Object.keys(data).map(skill => ({
    skill: skill.length > 12 ? skill.slice(0, 10) + '..' : skill,
    score: Math.round((data[skill].conceptual + data[skill].practical + data[skill].real_world) / 3),
    fullMark: 100,
  })).sort((a, b) => b.score - a.score).slice(0, 8);

  return (
    <div className="w-full h-72 -ml-2">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />
          <PolarAngleAxis 
            dataKey="skill" 
            tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 600 }} 
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 100]} 
            tick={false} 
            axisLine={false} 
          />
          <Tooltip 
            contentStyle={{ 
              borderRadius: '16px', 
              border: 'none', 
              boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
              fontSize: '12px',
              fontWeight: '600'
            }} 
          />
          <Radar
            name="Skill Proficiency"
            dataKey="score"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.15}
            strokeWidth={3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
