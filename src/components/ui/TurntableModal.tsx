import React, { useState, useRef } from 'react';
import { X, Play, Pause, RotateCw, ZoomIn, Eye, Sparkles, CheckCircle2, Image as ImageIcon, Video } from 'lucide-react';
import { Product } from '../../types';

interface TurntableModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
  productName?: string;
  sku?: string;
}

export const TurntableModal: React.FC<TurntableModalProps> = ({
  isOpen,
  onClose,
  product,
  productName = 'Goodyear-Welted Leather Boot',
  sku = 'CST-BOOT'
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const name = product?.name || productName;
  const productSku = product?.sku || sku;
  const isChelseaBoot = product?.id === 'prod-001';

  const [activeTab, setActiveTab] = useState<'photo' | 'video'>(isChelseaBoot ? 'video' : 'photo');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [rotationAngle, setRotationAngle] = useState<number>(0); // 0 to 360 degrees
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  if (!isOpen) return null;

  const currentImage = product?.images?.[selectedImageIndex] || product?.images?.[0] || '/assets/images/chelsea_boot_walnut_1793033837576.jpg';

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const setSpeed = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 lg:p-8 animate-fade-in">
      <div className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-5xl overflow-hidden shadow-2xl relative flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-stone-800 bg-stone-950/80">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono tracking-wider uppercase">
              <RotateCw className="w-3.5 h-3.5 animate-spin-slow" /> 360° Studio Inspection Studio
            </div>
            <h3 className="text-xl font-serif text-stone-100 mt-0.5">
              {name} <span className="text-stone-500 font-sans text-xs">({productSku})</span>
            </h3>
          </div>

          <div className="flex items-center gap-3">
            {/* Mode Switcher if video is available */}
            {isChelseaBoot && (
              <div className="flex items-center bg-stone-800 p-1 rounded-lg border border-stone-700 text-xs">
                <button
                  onClick={() => setActiveTab('video')}
                  className={`px-3 py-1 rounded font-semibold flex items-center gap-1.5 transition-all ${
                    activeTab === 'video' ? 'bg-amber-500 text-stone-950' : 'text-stone-300 hover:text-stone-100'
                  }`}
                >
                  <Video className="w-3.5 h-3.5" /> 360° Video
                </button>
                <button
                  onClick={() => setActiveTab('photo')}
                  className={`px-3 py-1 rounded font-semibold flex items-center gap-1.5 transition-all ${
                    activeTab === 'photo' ? 'bg-amber-500 text-stone-950' : 'text-stone-300 hover:text-stone-100'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" /> Photo Inspection
                </button>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 overflow-y-auto">
          
          {/* Main Inspection Display */}
          <div className="lg:col-span-8 bg-stone-950 rounded-xl border border-stone-800 relative overflow-hidden flex flex-col items-center justify-center p-4 min-h-[380px]">
            {activeTab === 'video' ? (
              <>
                <video
                  ref={videoRef}
                  src="/assets/aistudio/Leather_boots_on_turntable_1080p_20261026213940_d354a8c8.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto max-h-[420px] object-contain rounded-xl"
                />

                <div className="absolute bottom-3 inset-x-3 bg-stone-900/90 backdrop-blur-md border border-stone-800 px-4 py-2.5 rounded-xl flex items-center justify-between text-xs text-stone-200">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlay}
                      className="p-1.5 bg-amber-500 text-stone-950 rounded-lg font-semibold hover:bg-amber-400 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      <span>{isPlaying ? 'Pause' : 'Play 360°'}</span>
                    </button>

                    <div className="flex items-center gap-1 bg-stone-800 px-2 py-1 rounded-md text-stone-300">
                      <span className="text-stone-400">Speed:</span>
                      {[0.5, 1, 1.5].map((s) => (
                        <button
                          key={s}
                          onClick={() => setSpeed(s)}
                          className={`px-1.5 py-0.5 rounded text-[11px] font-mono ${
                            playbackSpeed === s ? 'bg-amber-500/20 text-amber-300 font-bold' : 'hover:text-stone-100'
                          }`}
                        >
                          {s}x
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-amber-300 font-mono">
                    <Sparkles className="w-3.5 h-3.5" /> 1080p Studio Capture
                  </div>
                </div>
              </>
            ) : (
              /* Photo Angle Inspection with 360° Rotation simulation */
              <div className="w-full flex flex-col items-center justify-center space-y-4">
                <div className="relative w-full h-[360px] flex items-center justify-center overflow-hidden rounded-xl bg-stone-900/80 p-2">
                  <img
                    src={currentImage}
                    alt={name}
                    className="max-h-80 w-auto object-contain transition-all duration-300 ease-out shadow-2xl"
                    style={{
                      transform: `scale(${zoomLevel}) rotateY(${rotationAngle}deg)`,
                      filter: 'drop-shadow(0 20px 25px rgba(0,0,0,0.8))'
                    }}
                  />
                  <div className="absolute top-3 right-3 bg-stone-900/90 backdrop-blur-md px-3 py-1 rounded border border-stone-800 text-[11px] text-amber-300 font-mono">
                    Angle: {rotationAngle}° · Zoom: {zoomLevel}x
                  </div>
                </div>

                {/* 360 Rotation Scrub Controls */}
                <div className="w-full bg-stone-900/90 border border-stone-800 p-3 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center justify-between text-stone-300">
                    <span className="font-mono text-amber-400 flex items-center gap-1.5">
                      <RotateCw className="w-3.5 h-3.5" /> Drag Slider to Rotate 360°
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setZoomLevel(prev => (prev === 1 ? 1.5 : 1))}
                        className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 rounded text-stone-200 flex items-center gap-1 cursor-pointer"
                      >
                        <ZoomIn className="w-3.5 h-3.5" /> {zoomLevel === 1 ? 'Zoom 1.5x' : 'Reset Zoom'}
                      </button>
                    </div>
                  </div>

                  <input
                    type="range"
                    min="-180"
                    max="180"
                    value={rotationAngle}
                    onChange={(e) => setRotationAngle(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer bg-stone-800 h-2 rounded-lg"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Inspection Focal Points & Product Details Panel */}
          <div className="lg:col-span-4 space-y-4">
            {/* Gallery Thumbnails if multiple */}
            {product?.images && product.images.length > 1 && (
              <div className="bg-stone-950 border border-stone-800 p-3 rounded-xl space-y-2">
                <span className="text-amber-400 text-xs font-mono uppercase tracking-wider block">
                  Product Image Angles ({product.images.length})
                </span>
                <div className="flex gap-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedImageIndex(idx);
                        setActiveTab('photo');
                      }}
                      className={`w-16 h-16 rounded-lg border overflow-hidden transition-all ${
                        selectedImageIndex === idx
                          ? 'border-amber-500 ring-2 ring-amber-500/30'
                          : 'border-stone-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Angle" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-stone-950 border border-stone-800 p-4 rounded-xl space-y-3">
              <span className="text-amber-400 text-xs font-mono uppercase tracking-wider block">
                Focal Inspection Points
              </span>

              <div className="space-y-2 text-xs">
                <div className="p-3 bg-stone-900 rounded-lg border border-stone-800 space-y-1">
                  <span className="font-semibold text-stone-200 block">1. Leather & Shaft Stitching</span>
                  <p className="text-stone-400 text-[11px]">
                    {product?.leatherType || 'Grade-A Full Grain'} · Hand-stitched stress points.
                  </p>
                </div>

                <div className="p-3 bg-stone-900 rounded-lg border border-stone-800 space-y-1">
                  <span className="font-semibold text-stone-200 block">2. Construction Method</span>
                  <p className="text-stone-400 text-[11px]">
                    {product?.construction || 'Goodyear Welted'} · Endlessly resolable structure.
                  </p>
                </div>

                <div className="p-3 bg-stone-900 rounded-lg border border-stone-800 space-y-1">
                  <span className="font-semibold text-stone-200 block">3. Soling & Heel Counter</span>
                  <p className="text-stone-400 text-[11px]">
                    {product?.outsoleMaterial || 'Double Leather / Vibram Outsole'}.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-stone-950 border border-stone-800 p-4 rounded-xl text-xs space-y-2">
              <span className="text-stone-400 uppercase font-mono text-[10px] block">Verified Master Features</span>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-stone-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{product?.countryOfOrigin || 'Porto, Portugal'} Origin</span>
                </div>
                <div className="flex items-center gap-2 text-stone-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>MOQ: {product?.moq || 24} Pairs per Style</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
