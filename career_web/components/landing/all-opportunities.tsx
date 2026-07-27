"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { MotionSection } from "@/components/ui/motion-section";
import {
  OPPORTUNITIES,
  OPPORTUNITY_TYPES,
  type OpportunityType,
} from "@/lib/opportunities";
import { OpportunityCard } from "./opportunity-card";

type FilterValue = "All" | OpportunityType;

const FILTERS: FilterValue[] = ["All", ...OPPORTUNITY_TYPES];

export function AllOpportunities() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterValue>("All");

  useEffect(() => {
    const type = searchParams.get("type");
    setActiveFilter(
      type && OPPORTUNITY_TYPES.includes(type as OpportunityType)
        ? (type as OpportunityType)
        : "All",
    );
  }, [searchParams]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return OPPORTUNITIES.filter((job) => {
      const matchesFilter = activeFilter === "All" || job.type === activeFilter;
      const matchesQuery =
        normalized.length === 0 ||
        job.title.toLowerCase().includes(normalized) ||
        job.company.toLowerCase().includes(normalized) ||
        job.location.toLowerCase().includes(normalized) ||
        job.type.toLowerCase().includes(normalized) ||
        job.description.toLowerCase().includes(normalized);

      return matchesFilter && matchesQuery;
    });
  }, [activeFilter, query]);

  return (
    <section id="all-opportunities" className="section-elevated py-12 sm:py-16">
      <div className="cl-container">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="cl-heading text-2xl sm:text-3xl">
              All Opportunities
            </h2>
            <p className="cl-subtext mt-2 text-sm sm:text-base">
              Browse {OPPORTUNITIES.length} example listings across internships,
              jobs, graduate programs and career events.
            </p>
          </div>
          <label className="relative w-full max-w-md">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-cl-muted"
              aria-hidden
            />
            <input
              type="search"
              aria-label="Search opportunities"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by title, company or location..."
              className="w-full rounded-xl border border-cl-border bg-cl-main py-3 pl-10 pr-4 text-sm text-cl-text outline-none transition placeholder:text-cl-muted focus:border-cl-blue focus:ring-2 focus:ring-cl-blue/20"
            />
          </label>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            const count =
              filter === "All"
                ? OPPORTUNITIES.length
                : OPPORTUNITIES.filter((job) => job.type === filter).length;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "border-cl-blue bg-cl-blue text-white"
                    : "border-cl-border bg-cl-main text-cl-muted hover:border-cl-blue/40 hover:text-cl-text"
                }`}
              >
                {filter}
                <span
                  className={`ml-1.5 ${isActive ? "text-blue-100" : "text-cl-muted"}`}
                >
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        <p className="mt-6 text-sm text-cl-muted">
          Showing {filtered.length} of {OPPORTUNITIES.length} opportunities
        </p>

        {filtered.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((job, index) => (
              <MotionSection key={job.id} delay={Math.min(index * 0.03, 0.24)}>
                <OpportunityCard job={job} showImage />
              </MotionSection>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-cl-border bg-cl-main/50 px-6 py-14 text-center">
            <p className="text-lg font-semibold text-cl-text">
              No opportunities found
            </p>
            <p className="mt-2 text-sm text-cl-muted">
              Try a different search term or clear your filters.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
