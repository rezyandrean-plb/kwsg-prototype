'use client';
import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';

const categories = [
  'Exit Audience',
  'District Disparity Effect',
  'MRT Proximity',
  "Parents' Attraction Effect",
  'Quantum Effect',
  'Rental Demand',
  'Region Disparity Effect',
  'Volume Effect',
  "Bala's Curve Effect",
  'Landsize Density Effect',
];

const categoryDescriptions = [
  'The impact of the target buyer demographic on property resale value and demand.',
  'The influence of differences in property prices and development across various districts.',
  'The effect of proximity to MRT (Mass Rapid Transit) stations on property desirabilty and pricing.',
  "The increased demand for properties near reputable schools driven by parents seeking enrollment advantages.",
  'The psychological influence of absolute price (quantum) on buyer perception and decision-making.',
  'The impact of tenant demand in the area on rental yield and investment value.',
  'How regional factors, such as economic activity and infrastructure, affect property values.',
  'The influence of transaction volume on market sentiment and property price trends.',
  "The depreciation pattern of leasehold properties over time based on Bala's curve.",
  'The effect of land size and development density on property value and lifestyle appeal.'
];

type Moat = {
  project?: string;
  exitAudience?: number;
  districtDisparityEffect?: number;
  mrtProximity?: number;
  parentsAttractionEffect?: number;
  quantumEffect?: number;
  rentalDemand?: number;
  regionDisparityEffect?: number;
  volumeEffect?: number;
  balasCurveEffect?: number;
  landsizeDensity?: number;
};

function getMoatData(moat: Moat | undefined) {
  if (!moat) return Array(categories.length).fill(0);
  return [
    moat.exitAudience ?? 0,
    moat.districtDisparityEffect ?? 0,
    moat.mrtProximity ?? 0,
    moat.parentsAttractionEffect ?? 0,
    moat.quantumEffect ?? 0,
    moat.rentalDemand ?? 0,
    moat.regionDisparityEffect ?? 0,
    moat.volumeEffect ?? 0,
    moat.balasCurveEffect ?? 0,
    moat.landsizeDensity ?? 0,
  ];
}

const loadScript = (src: string): Promise<void> => {
  return new Promise<void>((resolve) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
};

interface MoatRadarChartProps {
  moat?: Moat;
}

const MoatRadarChart: React.FC<MoatRadarChartProps> = ({ moat }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [isClient, setIsClient] = useState(false);
  const data = getMoatData(moat);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    const options = {
      chart: {
        type: 'area',
        polar: true,
        backgroundColor: 'transparent',
      },
      title: {
        text: null,
        style: { color: '#fff', fontSize: '24px', fontWeight: 600 },
      },
      pane: {
        startAngle: 0,
        endAngle: 360,
        size: '85%',
      },
      xAxis: {
        categories,
        tickmarkPlacement: 'on',
        lineWidth: 0,
        labels: {
          style: { color: '#fff', fontWeight: 'bold', fontSize: '14px' },
          distance: 20,
          y: 5,
        },
        gridLineColor: '#e5e7eb',
        gridLineWidth: 0.2,
        gridLineDashStyle: 'Dash',
      },
      yAxis: {
        title: {
          text: null,
          style: { color: '#fff' },
        },
        gridLineInterpolation: 'polygon',
        lineWidth: 0,
        min: 0,
        max: 5,
        tickInterval: 1,
        labels: { style: { color: '#fff' } },
        gridLineColor: 'rgba(245,246,248,0.2)',
        gridLineWidth: 1,
      },
      series: [
        {
          name: moat?.project || 'MOAT',
          data,
          pointPlacement: 'on',
          color: '#fff',
          fillColor: 'rgba(255,255,255,0.5)',
          lineWidth: 2,
          marker: { enabled: true, radius: 4, fillColor: '#fff' },
          showInLegend: true,
        },
      ],
      legend: {
        enabled: false,
        align: 'right',
        verticalAlign: 'bottom',
        itemStyle: { color: '#fff', fontWeight: 'normal', fontSize: '16px' },
      },
      credits: { enabled: false },
      plotOptions: {
        series: {
          animation: true,
          fillColor: 'rgba(255,255,255,0.5)',
        },
      },
      exporting: {
        enabled: true,
        buttons: {
          contextButton: {
            align: 'right',
            verticalAlign: 'top',
            symbolStroke: '#fff',
            symbolFill: '#fff',
            theme: {
              fill: 'transparent',
              stroke: 'transparent',
              states: {
                hover: {
                  fill: 'rgba(255,255,255,0.2)'
                },
                select: {
                  fill: 'rgba(255,255,255,0.4)'
                }
              },
            }
          }
        }
      },
      responsive: {
        rules: [{
          condition: {
            maxWidth: 600
          },
          chartOptions: {
            xAxis: {
              labels: {
                style: {
                  fontSize: '9px'
                },
                step: 2,
                crop: false,
                autoRotation: [-45, 0, 45],
                overflow: 'allow',
                distance: 17
              }
            },
            pane: {
              size: '50%'
            },
            yAxis: {
              tickPositions: [0, 1, 2, 3, 4, 5]
            }
          }
        }]
      },
      tooltip: {
        formatter: function (this: any) {
          const idx = this.point?.index ?? 0;
          return `<b>${categories[idx]}</b><br/>${categoryDescriptions[idx]}`;
        },
        useHTML: true,
        backgroundColor: 'rgba(167,170,188,0.75)',
        borderColor: '#a7aabc',
        style: { color: '#fff', fontSize: '14px' },
        borderRadius: 8,
        padding: 12,
      },
    };
    const ensureHighcharts = async () => {
      if (typeof window === 'undefined') return;
      const w = window as any;
      if (!w.Highcharts) {
        await loadScript('https://code.highcharts.com/highcharts.js');
      }
      if (!w.Highcharts?.seriesTypes?.polygon) {
        await loadScript('https://code.highcharts.com/highcharts-more.js');
      }
      if (w.Highcharts && chartRef.current) {
        w.Highcharts.chart(chartRef.current, options);
      }
    };
    ensureHighcharts();
  }, [moat, isClient]);

  if (!isClient) {
    return <div style={{ minHeight: 550 }} />;
  }

  return (
    <div>
      <h2 id="moat-analysis" className="mb-2 sm:mb-3 md:mb-4 text-2xl sm:text-3xl font-bold scroll-mt-40 text-left">MOAT Analysis</h2>
      <div
        ref={chartRef}
        style={{
          minHeight: 550,
          background: 'linear-gradient(135deg, #07254a 0%, #0a3c72 100%)',
          borderRadius: 16,
          padding: 10,
        }}
      />
    </div>
  );
};

export default MoatRadarChart; 