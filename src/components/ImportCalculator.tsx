"use client";

import React, { useState } from "react";
import { Calculator, ArrowRight } from "lucide-react";

export default function ImportCalculator() {
  const [jpyPrice, setJpyPrice] = useState<number>(1200000);
  const [fobJpy, setFobJpy] = useState<number>(100000);
  const [jpyRate, setJpyRate] = useState<number>(0.0098); // 1 JPY = 0.0098 AUD approx
  const [shippingAud, setShippingAud] = useState<number>(2200);
  const [dutyRate, setDutyRate] = useState<number>(5); // 5%
  const [gstRate, setGstRate] = useState<number>(10); // 10%
  const [complianceAud, setComplianceAud] = useState<number>(1800);
  const [brokerageAud, setBrokerageAud] = useState<number>(1200);

  // Calculations
  const carCostAud = Math.round((jpyPrice + fobJpy) * jpyRate);
  const cifCostAud = carCostAud + shippingAud;
  const dutyAmount = Math.round(cifCostAud * (dutyRate / 100));
  const gstAmount = Math.round((cifCostAud + dutyAmount + 500) * (gstRate / 100)); // approx 500 import port charge
  const totalLandedCost = carCostAud + shippingAud + dutyAmount + gstAmount + complianceAud + brokerageAud;

  return (
    <div id="calculator" className="w-full max-w-3xl mx-auto my-10 px-4 scroll-mt-24">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Brand Header Banner */}
        <div className="bg-[#f23410] px-6 py-6 text-center text-white">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Calculator size={24} className="text-white" />
            <h3 className="text-2xl font-black orb uppercase tracking-tight">Import Calculator</h3>
          </div>
          <p className="text-xs md:text-sm font-semibold opacity-90">
            Estimate the total landed cost of your imported vehicle
          </p>
        </div>

        {/* Calculator Inputs Body */}
        <div className="p-6 md:p-8 space-y-5 bg-gray-50/50">
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">
              Vehicle Purchase Price (JPY ¥)
            </label>
            <input
              type="number"
              value={jpyPrice}
              onChange={(e) => setJpyPrice(Number(e.target.value) || 0)}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium focus:ring-2 focus:ring-[#f23410] outline-none text-sm shadow-sm"
              placeholder="e.g. 1500000"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">
                FOB & Inland Fee (JPY ¥)
              </label>
              <input
                type="number"
                value={fobJpy}
                onChange={(e) => setFobJpy(Number(e.target.value) || 0)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium focus:ring-2 focus:ring-[#f23410] outline-none text-sm shadow-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">
                Exchange Rate (AUD/JPY)
              </label>
              <input
                type="number"
                step="0.0001"
                value={jpyRate}
                onChange={(e) => setJpyRate(Number(e.target.value) || 0)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium focus:ring-2 focus:ring-[#f23410] outline-none text-sm shadow-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">
                Shipping & Sea Freight (AUD $)
              </label>
              <input
                type="number"
                value={shippingAud}
                onChange={(e) => setShippingAud(Number(e.target.value) || 0)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium focus:ring-2 focus:ring-[#f23410] outline-none text-sm shadow-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">
                RAWS Compliance (AUD $)
              </label>
              <input
                type="number"
                value={complianceAud}
                onChange={(e) => setComplianceAud(Number(e.target.value) || 0)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 font-medium focus:ring-2 focus:ring-[#f23410] outline-none text-sm shadow-sm"
              />
            </div>
          </div>

          {/* Breakdown Summary */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-2 text-xs md:text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Vehicle & FOB (AUD):</span>
              <span className="font-semibold text-gray-900">${carCostAud.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Sea Freight & Logistics:</span>
              <span className="font-semibold text-gray-900">${shippingAud.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Customs Duty & Import GST:</span>
              <span className="font-semibold text-gray-900">${(dutyAmount + gstAmount).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Compliance & Brokerage:</span>
              <span className="font-semibold text-gray-900">${(complianceAud + brokerageAud).toLocaleString()}</span>
            </div>
          </div>

          {/* Result Output Display */}
          <div className="pt-2 text-center">
            <span className="text-xs uppercase font-bold text-gray-500 tracking-wider">Estimated Total Landed Cost</span>
            <div className="text-4xl md:text-5xl font-black orb text-black my-1">
              ${totalLandedCost.toLocaleString()}
            </div>
            <p className="text-[11px] text-gray-400">Includes vehicle, shipping, customs, GST, compliance & brokerage</p>
          </div>

          {/* CTA Action Button */}
          <a
            href="/contact-us"
            className="w-full bg-black text-white hover:bg-[#f23410] transition-colors duration-300 font-medium py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 text-sm orb uppercase tracking-wide cursor-pointer shadow-lg"
          >
            <span>Get A Quote</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
