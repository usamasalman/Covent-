import React from 'react';
import { Ship, Info, ArrowUpRight, Award } from 'lucide-react';

interface ContainerLoadBarProps {
  totalPairs: number;
}

export const ContainerLoadBar: React.FC<ContainerLoadBarProps> = ({ totalPairs }) => {
  const FCL_20FT_PAIRS = 2400; // Standard 20ft ocean container = ~2,400 pairs in master cartons
  const FCL_40FT_PAIRS = 5200; // Standard 40ft ocean container = ~5,200 pairs

  let currentCapacity = FCL_20FT_PAIRS;
  let containerType = '20ft FCL Container';

  if (totalPairs > FCL_20FT_PAIRS) {
    currentCapacity = FCL_40FT_PAIRS;
    containerType = '40ft High-Cube FCL Container';
  }

  const percentage = Math.min(Math.round((totalPairs / currentCapacity) * 100), 100);
  const pairsNeeded = Math.max(0, currentCapacity - totalPairs);
  const cartonsCount = Math.ceil(totalPairs / 12); // 12 pairs per carton

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-xl p-4 text-xs space-y-2.5">
      <div className="flex items-center justify-between text-stone-200">
        <div className="flex items-center gap-2 font-medium">
          <Ship className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Freight Container Fill ({containerType})</span>
        </div>
        <span className="font-mono text-amber-300 font-semibold">{percentage}% Full</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-stone-950 h-3 rounded-full overflow-hidden border border-stone-800 relative">
        <div
          className={`h-full transition-all duration-500 rounded-full ${
            percentage >= 100
              ? 'bg-gradient-to-r from-emerald-600 to-emerald-400'
              : percentage >= 50
              ? 'bg-gradient-to-r from-amber-600 to-amber-400'
              : 'bg-gradient-to-r from-amber-700 to-amber-500'
          }`}
          style={{ width: `${Math.max(percentage, 4)}%` }}
        />
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 gap-2 text-[11px] pt-0.5">
        <div className="text-stone-400">
          Cartons: <span className="text-stone-200 font-mono font-medium">{cartonsCount} CTN</span> ({totalPairs} pairs)
        </div>
        <div className="text-right text-stone-400">
          {percentage >= 100 ? (
            <span className="text-emerald-400 font-semibold flex items-center justify-end gap-1">
              <Award className="w-3.5 h-3.5" /> FCL Volume Rate Unlocked!
            </span>
          ) : (
            <span>
              Add <strong className="text-amber-300 font-mono">{pairsNeeded} pairs</strong> for FCL Rate
            </span>
          )}
        </div>
      </div>

      <p className="text-[10px] text-stone-500 leading-tight">
        Optimizing ocean freight cartons minimizes per-pair transit cost & reduces port handling surcharges.
      </p>
    </div>
  );
};
