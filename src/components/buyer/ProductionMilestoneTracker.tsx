import React from 'react';
import { CheckCircle2, Clock, Truck, ShieldCheck, Factory, Anchor, ArrowRight } from 'lucide-react';

export interface ManufacturingStage {
  stageNumber: number;
  title: string;
  subtitle: string;
  dateEst: string;
  status: 'completed' | 'in_progress' | 'upcoming';
  qcNote: string;
}

interface ProductionMilestoneTrackerProps {
  orderId?: string;
  poReference?: string;
  estCompletionDate?: string;
  currentStageNumber?: number;
}

export const ProductionMilestoneTracker: React.FC<ProductionMilestoneTrackerProps> = ({
  orderId = 'ORD-2026-4401',
  poReference = 'PO-BT-9921',
  estCompletionDate = '2026-11-14',
  currentStageNumber = 3
}) => {
  const STAGES: ManufacturingStage[] = [
    {
      stageNumber: 1,
      title: 'Clicker Cut & Grain Inspection',
      subtitle: 'Selecting Grade-A French calfskins & precision clicking',
      dateEst: 'Oct 24, 2026',
      status: currentStageNumber > 1 ? 'completed' : currentStageNumber === 1 ? 'in_progress' : 'upcoming',
      qcNote: 'Zero grain flaw pass rate achieved across 60 master pairs.'
    },
    {
      stageNumber: 2,
      title: 'Upper Skiving & Thread Sewing',
      subtitle: 'Upper skiving, quarter lining & eyelet hardware setting',
      dateEst: 'Oct 29, 2026',
      status: currentStageNumber > 2 ? 'completed' : currentStageNumber === 2 ? 'in_progress' : 'upcoming',
      qcNote: 'Triple-stitched stress zones verified at 120 PSI tensile strength.'
    },
    {
      stageNumber: 3,
      title: 'Wooden Lasting & Goodyear Welting',
      subtitle: 'Molding over wooden last & lockstitching 360° storm welt',
      dateEst: 'Nov 04, 2026',
      status: currentStageNumber > 3 ? 'completed' : currentStageNumber === 3 ? 'in_progress' : 'upcoming',
      qcNote: 'Currently on assembly line bench #4 at Porto Atelier.'
    },
    {
      stageNumber: 4,
      title: 'Granulated Cork & Shank Insertion',
      subtitle: 'Filling cork cavity bed & setting Sheffield steel arch shank',
      dateEst: 'Nov 08, 2026',
      status: currentStageNumber > 4 ? 'completed' : currentStageNumber === 4 ? 'in_progress' : 'upcoming',
      qcNote: 'Thermal cork barrier density verified.'
    },
    {
      stageNumber: 5,
      title: 'Outsole Attachment & Hand Burnish',
      subtitle: 'Vibram outsole attachment, edge inking & hand patinating',
      dateEst: 'Nov 11, 2026',
      status: currentStageNumber > 5 ? 'completed' : currentStageNumber === 5 ? 'in_progress' : 'upcoming',
      qcNote: 'Hand-burnished wax finish application.'
    },
    {
      stageNumber: 6,
      title: 'QC Packout & Ocean Freight Crating',
      subtitle: '100% pair inspection, custom box sleeve & palletization',
      dateEst: 'Nov 14, 2026',
      status: currentStageNumber > 6 ? 'completed' : currentStageNumber === 6 ? 'in_progress' : 'upcoming',
      qcNote: 'Export Bill of Lading & Customs Manifest generated.'
    }
  ];

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 text-stone-100 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-400 font-mono uppercase">
            <Factory className="w-3.5 h-3.5" /> Live Manufacturing Progress Tracker
          </div>
          <h3 className="text-xl font-serif text-amber-100 mt-0.5">
            Order {orderId} <span className="text-stone-400 text-sm">({poReference})</span>
          </h3>
        </div>

        <div className="flex items-center gap-3 bg-stone-950 px-4 py-2 rounded-xl border border-stone-800 text-xs">
          <Clock className="w-4 h-4 text-amber-400 shrink-0" />
          <div>
            <span className="text-stone-400 block text-[10px]">Estimated Dispatch Date</span>
            <span className="text-amber-200 font-semibold font-mono">{estCompletionDate}</span>
          </div>
        </div>
      </div>

      {/* Progress Timeline */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {STAGES.map((stage) => (
            <div
              key={stage.stageNumber}
              className={`p-4 rounded-xl border text-xs relative transition-all ${
                stage.status === 'completed'
                  ? 'bg-stone-950/90 border-emerald-500/40 text-stone-200'
                  : stage.status === 'in_progress'
                  ? 'bg-amber-500/10 border-amber-500/60 text-amber-100 ring-1 ring-amber-500/30'
                  : 'bg-stone-950/40 border-stone-800/80 text-stone-500'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    stage.status === 'completed'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : stage.status === 'in_progress'
                      ? 'bg-amber-500 text-stone-950'
                      : 'bg-stone-800 text-stone-400'
                  }`}
                >
                  Stage {stage.stageNumber} / 6
                </span>

                <span className="text-[10px] font-mono text-stone-400">{stage.dateEst}</span>
              </div>

              <h4 className="font-semibold text-sm text-stone-100 mb-1 flex items-center gap-1.5">
                {stage.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                {stage.status === 'in_progress' && <Clock className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />}
                {stage.title}
              </h4>

              <p className="text-stone-400 text-[11px] leading-relaxed mb-3">
                {stage.subtitle}
              </p>

              <div className="bg-stone-900/80 p-2 rounded-lg border border-stone-800/80 text-[10px] text-stone-300 flex items-start gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{stage.qcNote}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
