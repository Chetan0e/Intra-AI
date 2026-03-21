import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, PolarRadiusAxis, Tooltip } from "recharts";

export default function SkillRadar({ data }) {
  // Format data for Recharts
  // Input: { "JavaScript": { "conceptual": 80, ... }, "React": ... }
  const chartData = Object.keys(data).map((skill) => {
    const dna = data[skill];
    const avg = (dna.conceptual + dna.practical + dna.real_world) / 3;
    return {
      skill,
      score: Math.round(avg),
      fullMark: 100,
    };
  });

  return (
    <div className="w-full h-64 flex justify-center items-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
          <PolarGrid stroke="#334155" />
          <PolarAngleAxis dataKey="skill" tick={{ fill: "#94a3b8", fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
            itemStyle={{ color: '#60A5FA' }}
          />
          <Radar
            name="Skill Match"
            dataKey="score"
            stroke="#60A5FA"
            fill="#3B82F6"
            fillOpacity={0.5}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
