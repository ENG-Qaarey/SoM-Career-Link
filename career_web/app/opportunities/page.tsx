import type { Metadata } from "next";

import { Suspense } from "react";

import { SiteShell } from "@/components/landing/site-shell";

import { PageHero } from "@/components/landing/page-hero";

import { AllOpportunities } from "@/components/landing/all-opportunities";

import { FinalCTA } from "@/components/landing/final-cta";

import { OPPORTUNITIES } from "@/lib/opportunities";



export const metadata: Metadata = {

  title: "Opportunities | CareerLink Somalia",

  description:

    "Browse all internships, entry-level jobs, graduate programs and career events across Somalia.",

};



function OpportunitiesListFallback() {

  return (

    <section className="section-elevated py-12 sm:py-16">

      <div className="cl-container">

        <div className="h-10 w-64 animate-pulse rounded-lg bg-cl-elevated" />

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

          {Array.from({ length: 6 }).map((_, i) => (

            <div key={i} className="cl-card aspect-[4/5] animate-pulse bg-cl-elevated" />

          ))}

        </div>

      </div>

    </section>

  );

}



export default function OpportunitiesPage() {

  return (

    <SiteShell>

      <PageHero

        label="Opportunities"

        title="Explore Career Opportunities Across Somalia"

        subtitle={`Browse all ${OPPORTUNITIES.length} listings — internships, graduate programs, entry-level roles and career events with search and filters.`}

      />

      <Suspense fallback={<OpportunitiesListFallback />}>

        <AllOpportunities />

      </Suspense>

      <FinalCTA />

    </SiteShell>

  );

}

