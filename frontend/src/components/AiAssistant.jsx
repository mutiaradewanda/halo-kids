import React, { useState, useEffect } from 'react';
import {
  Bot,
  X,
  Maximize2,
  Minimize2,
  FileCheck,
  Upload
} from 'lucide-react';
import { AdminDocumentReview, UserUploadAiExtractor } from './AiVerification';

/**
 * Komponen AI Assistant & Modul Verifikasi Berkas Terpadu HaloKids
 * Berfungsi sebagai:
 * 1. Floating Widget di pojok kanan bawah (HANYA MUNCUL JIKA USER LOGIN)
 * 2. Window Interaktif yang menyajikan 2 Tab Menu Utama:
 *    - Tab 1: Review Dokumen (Sisi Admin)
 *    - Tab 2: Upload & Status AI (Sisi Pemohon)
 */
export default function AiAssistant({
  isLoggedIn = true,
  currentUser = null,
  onOpenAdopsi,
  onOpenLapor
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState('admin-review'); // 'admin-review' | 'user-upload'

  // Fitur AI hanya tersedia untuk pengguna yang sudah login
  if (!isLoggedIn) {
    return null;
  }

  // Close on ESC key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Lock background body scroll when AI modal is open
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  return (
    <>
      {/* ---------------- FLOATING ACTION BUTTON (BOTTOM-RIGHT) ---------------- */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-[990] group flex items-center gap-3 p-3.5 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 text-white rounded-full shadow-2xl hover:shadow-blue-600/50 hover:scale-105 active:scale-95 transition-all duration-300 ring-4 ring-white/80"
          title="Buka AI Assistant & Verifikasi Berkas HaloKids"
        >
          <div className="relative">
            <Bot size={26} className="text-cyan-300 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full ring-2 ring-slate-900 animate-ping" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full ring-2 ring-slate-900" />
          </div>
          <div className="hidden sm:flex flex-col text-left pr-2">
            <span className="text-[11px] font-black tracking-wider uppercase text-cyan-200">
              AI Verification Hub
            </span>
            <span className="text-xs font-bold text-white leading-tight">
              AI Assistant &amp; Verifikasi
            </span>
          </div>
        </button>
      )}

      {/* ---------------- MODAL / WINDOW COMPONENT ---------------- */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-hidden animate-in fade-in"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className={`bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden transition-all duration-300 relative ${
              isFullscreen
                ? 'w-full h-full rounded-none'
                : 'w-full max-w-6xl max-h-[92vh] h-[860px]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Window Top Titlebar */}
            <div className="bg-slate-900 text-white p-3.5 sm:px-6 flex items-center justify-between border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600/30 text-cyan-300 rounded-xl ring-1 ring-cyan-400/30">
                  <Bot size={22} />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-black tracking-tight flex items-center gap-2">
                    HaloKids AI Assistant &amp; Verifikasi Berkas
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-200 ring-1 ring-cyan-400/40">
                      Single-Agent Engine
                    </span>
                  </h2>
                  <p className="text-[11px] text-slate-400 hidden sm:block">
                    Modul inspeksi OCR COTA &amp; Donasi berdasarkan PRD Dinas Sosial Kabupaten
                  </p>
                </div>
              </div>

              {/* Titlebar Actions */}
              <div className="flex items-center gap-1.5 text-slate-400">
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition"
                  title={isFullscreen ? 'Perkecil' : 'Layar Penuh'}
                >
                  {isFullscreen ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-rose-600 hover:text-white text-slate-300 transition"
                  title="Tutup (ESC)"
                  aria-label="Tutup"
                >
                  <X size={19} />
                </button>
              </div>
            </div>

            {/* Sub-Navigation Tabs */}
            <div className="bg-slate-100 px-4 sm:px-6 py-2 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                {/* Tab 1: Review Admin */}
                <button
                  onClick={() => setActiveTab('admin-review')}
                  className={`text-xs px-3.5 py-2 rounded-xl font-bold flex items-center gap-2 transition ${
                    activeTab === 'admin-review'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                      : 'bg-white text-slate-600 hover:bg-slate-200/80 border border-slate-300'
                  }`}
                >
                  <FileCheck size={15} />
                  <span>1. Review Dokumen (Sisi Admin)</span>
                </button>

                {/* Tab 2: Upload Pemohon */}
                <button
                  onClick={() => setActiveTab('user-upload')}
                  className={`text-xs px-3.5 py-2 rounded-xl font-bold flex items-center gap-2 transition ${
                    activeTab === 'user-upload'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                      : 'bg-white text-slate-600 hover:bg-slate-200/80 border border-slate-300'
                  }`}
                >
                  <Upload size={15} />
                  <span>2. Upload &amp; Status AI (Sisi Pemohon)</span>
                </button>

              </div>

              {/* Status Hint */}
              <div className="hidden md:flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Backend Single-Agent API: Siap &amp; Aktif</span>
              </div>
            </div>

            {/* Window Content Body */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-5 bg-slate-100">
              {/* TAB 1: ADMIN SPLIT-SCREEN DOCUMENT REVIEW */}
              {activeTab === 'admin-review' && (
                <div className="space-y-4">
                  <AdminDocumentReview isModal={false} />
                </div>
              )}

              {/* TAB 2: USER UPLOAD AI EXTRACTOR */}
              {activeTab === 'user-upload' && (
                <div className="max-w-4xl mx-auto space-y-4">
                  <UserUploadAiExtractor />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
