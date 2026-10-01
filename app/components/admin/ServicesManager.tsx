"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { services as siteServices } from "@/app/lib/services";
import {
  createServiceId,
  ICON_OPTIONS,
  seedAdminServices,
  type AdminService,
} from "@/app/lib/adminServices";
import { FiEdit2, FiPlus, FiSearch, FiTrash2, FiX } from "react-icons/fi";

type FormState = {
  title: string;
  description: string;
  icon: string;
};

const emptyForm: FormState = {
  title: "",
  description: "",
  icon: ICON_OPTIONS[0].value,
};

const STORAGE_KEY = "ainovex_admin_services";

function loadServices(): AdminService[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as AdminService[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // fall through to seed
  }
  return seedAdminServices(siteServices);
}

function saveServices(items: AdminService[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export default function ServicesManager() {
  const [items, setItems] = useState<AdminService[]>([]);
  const [ready, setReady] = useState(false);
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [formError, setFormError] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    setItems(loadServices());
    setReady(true);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
    );
  }, [items, query]);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormError("");
    setModalOpen(true);
  };

  const openEdit = (service: AdminService) => {
    setEditingId(service.id);
    setForm({
      title: service.title,
      description: service.description,
      icon: service.icon,
    });
    setFormError("");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setForm(emptyForm);
    setFormError("");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setFormError("Title is required.");
      return;
    }
    if (form.description.trim().length < 10) {
      setFormError("Description should be at least 10 characters.");
      return;
    }

    let next: AdminService[];
    if (editingId) {
      next = items.map((s) =>
        s.id === editingId
          ? {
              ...s,
              title: form.title.trim(),
              description: form.description.trim(),
              icon: form.icon,
            }
          : s
      );
    } else {
      next = [
        {
          id: createServiceId(),
          title: form.title.trim(),
          description: form.description.trim(),
          icon: form.icon,
        },
        ...items,
      ];
    }

    setItems(next);
    saveServices(next);
    closeModal();
  };

  const confirmDelete = () => {
    if (!deleteId) return;
    const next = items.filter((s) => s.id !== deleteId);
    setItems(next);
    saveServices(next);
    setDeleteId(null);
  };

  if (!ready) {
    return (
      <p className="text-sm text-white/60">Loading services…</p>
    );
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-[28px] font-semibold tracking-tight text-white sm:text-[32px]">
            Services
          </h1>
          <p className="mt-2 text-[15px] text-white/60">
            Manage the services listed on your website. Changes are saved locally
            for now.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-[14px] font-semibold text-black-v0 transition hover:bg-primary/90"
        >
          <FiPlus size={18} />
          Add service
        </button>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <FiSearch
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
            size={16}
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services…"
            className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] pl-10 pr-4 text-[14px] text-white outline-none placeholder:text-white/40 focus:border-primary/50"
          />
        </div>
        <p className="text-[13px] text-white/45">
          {filtered.length} of {items.length} services
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-[14px]">
            <thead className="border-b border-white/10 bg-white/[0.03] text-[12px] uppercase tracking-wider text-white/45">
              <tr>
                <th className="px-4 py-3 font-medium">Service</th>
                <th className="px-4 py-3 font-medium">Description</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-12 text-center text-white/50"
                  >
                    No services found.
                  </td>
                </tr>
              ) : (
                filtered.map((service) => (
                  <tr
                    key={service.id}
                    className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          <Image
                            src={service.icon}
                            alt=""
                            width={22}
                            height={22}
                          />
                        </div>
                        <span className="font-medium text-white">
                          {service.title}
                        </span>
                      </div>
                    </td>
                    <td className="max-w-md px-4 py-4 text-white/55">
                      <p className="line-clamp-2">{service.description}</p>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(service)}
                          className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/10 px-3 text-[13px] text-white/80 transition hover:border-primary/40 hover:text-primary"
                        >
                          <FiEdit2 size={14} />
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteId(service.id)}
                          className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/10 px-3 text-[13px] text-red-300/90 transition hover:border-red-400/40 hover:bg-red-500/10"
                        >
                          <FiTrash2 size={14} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/70"
            aria-label="Close dialog"
            onClick={closeModal}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-modal-title"
            className="relative z-10 w-full max-w-lg rounded-2xl border border-white/10 bg-[#0F172A] p-6 shadow-2xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2
                id="service-modal-title"
                className="text-[20px] font-semibold text-white"
              >
                {editingId ? "Edit service" : "Add service"}
              </h2>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg p-2 text-white/50 hover:bg-white/5 hover:text-white"
                aria-label="Close"
              >
                <FiX size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="svc-title"
                  className="text-[12px] font-semibold tracking-wide text-white/70"
                >
                  Title
                </label>
                <input
                  id="svc-title"
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  className="h-11 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-[14px] text-white outline-none focus:border-primary/50"
                  placeholder="e.g. Web Development"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="svc-desc"
                  className="text-[12px] font-semibold tracking-wide text-white/70"
                >
                  Description
                </label>
                <textarea
                  id="svc-desc"
                  rows={4}
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  className="resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[14px] text-white outline-none focus:border-primary/50"
                  placeholder="Short description of the service…"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="svc-icon"
                  className="text-[12px] font-semibold tracking-wide text-white/70"
                >
                  Icon
                </label>
                <select
                  id="svc-icon"
                  value={form.icon}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, icon: e.target.value }))
                  }
                  className="h-11 rounded-xl border border-white/10 bg-[#0F172A] px-4 text-[14px] text-white outline-none focus:border-primary/50"
                >
                  {ICON_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {formError && (
                <p role="alert" className="text-[13px] text-red-300">
                  {formError}
                </p>
              )}

              <div className="mt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="h-11 rounded-xl border border-white/15 px-5 text-[14px] font-medium text-white/80 transition hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-11 rounded-xl bg-primary px-5 text-[14px] font-semibold text-black-v0 transition hover:bg-primary/90"
                >
                  {editingId ? "Save changes" : "Create service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/70"
            aria-label="Close dialog"
            onClick={() => setDeleteId(null)}
          />
          <div
            role="dialog"
            aria-modal="true"
            className="relative z-10 w-full max-w-sm rounded-2xl border border-white/10 bg-[#0F172A] p-6"
          >
            <h2 className="text-[18px] font-semibold text-white">
              Delete service?
            </h2>
            <p className="mt-2 text-[14px] text-white/60">
              This removes the service from the admin list. You can add it again
              later.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteId(null)}
                className="h-10 rounded-xl border border-white/15 px-4 text-[14px] text-white/80 hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="h-10 rounded-xl bg-red-500/90 px-4 text-[14px] font-semibold text-white hover:bg-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
