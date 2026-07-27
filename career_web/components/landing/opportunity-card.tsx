import Image from "next/image";
import { MapPin } from "lucide-react";
import { getOpportunityImage, type Opportunity } from "@/lib/opportunities";

type OpportunityCardProps = {
  job: Opportunity;
  showImage?: boolean;
};

export function OpportunityCard({
  job,
  showImage = true,
}: OpportunityCardProps) {
  const imageSrc = getOpportunityImage(job);
  const imageAlt = job.imageAlt ?? `${job.title} — ${job.company}`;

  return (
    <article className="cl-card flex h-full flex-col overflow-hidden p-0">
      {showImage && (
        <div className="relative aspect-[16/10] w-full shrink-0 bg-cl-main">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          <span className="absolute left-3 top-3 rounded-md bg-black/45 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            {job.type}
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cl-blue-light text-sm font-bold text-cl-blue">
              {job.initials}
            </div>
            <div>
              <h3 className="text-lg font-semibold leading-snug text-cl-text">
                {job.title}
              </h3>
              <p className="text-sm text-cl-muted">{job.company}</p>
            </div>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-cl-muted">
          <span className="inline-flex items-center gap-1">
            <MapPin size={12} />
            {job.location}
          </span>
          {!showImage && (
            <span className="rounded-md bg-cl-blue-light px-2 py-0.5 font-medium text-cl-blue">
              {job.type}
            </span>
          )}
          <span>{job.date}</span>
        </div>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-cl-muted">
          {job.description}
        </p>
      </div>
    </article>
  );
}
