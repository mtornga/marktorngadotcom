'use client';

import { useEffect, useMemo, useState } from 'react';
import Container from '@/components/layout/Container';
import ResumeDial from '@/components/resume/ResumeDial';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import {
  currentWork,
  currentWorkExtendedBullets,
  educationAndCerts,
  experience,
  resumeExpandedExperienceNotes,
  resumeExpandedProjects,
  resumeIdentity,
  resumeLevels,
  resumePdfExperience,
  resumePdfPath,
  resumePdfProjects,
  resumePdfSkillClusters,
  resumePdfSummary,
  resumeQuoteLibrary,
  skillGroups,
} from '@/lib/resume/content';

const dialLevels = resumeLevels.map((level) => ({ value: level.value, label: level.label }));

interface DeepConfig {
  experienceBullets: number;
  extraNotes: number;
  projectCount: number;
  approachBullets: number;
  outcomeBullets: number;
  quoteCount: number;
  currentWorkBullets: number;
}

function deepConfigFor(level: number): DeepConfig {
  if (level === 2) {
    return {
      experienceBullets: 3,
      extraNotes: 2,
      projectCount: 4,
      approachBullets: 2,
      outcomeBullets: 2,
      quoteCount: 4,
      currentWorkBullets: 2,
    };
  }

  return {
    experienceBullets: 6,
    extraNotes: 5,
    projectCount: resumeExpandedProjects.length,
    approachBullets: 4,
    outcomeBullets: 4,
    quoteCount: resumeQuoteLibrary.length,
    currentWorkBullets: 3,
  };
}

function WhyTeamsHireMe() {
  return (
    <article className="rounded-sm border border-zinc-300 bg-white p-5 md:p-6 shadow-sm">
      <h2 className="font-heading font-bold text-3xl mb-4">Why Teams Hire Me</h2>
      <ul className="list-disc list-inside space-y-2 text-zinc-800 leading-7">
        <li>
          <strong>Architecture + delivery:</strong> I can design the platform and still ship the implementation details.
        </li>
        <li>
          <strong>Enterprise credibility:</strong> I partner directly with <em>CIO/CFO/VP stakeholders</em> on decisions that affect risk and adoption.
        </li>
        <li>
          <strong>Applied AI discipline:</strong> I treat prompting, evaluation loops, and model cost controls as production engineering work.
        </li>
      </ul>
    </article>
  );
}

function QuickBiteView() {
  return (
    <section className="max-w-5xl mx-auto">
      <article className="rounded-sm border border-zinc-300 bg-white p-5 md:p-6 shadow-sm">
        <h2 className="font-heading font-bold text-3xl mb-4">Quick Bite</h2>
        <p className="text-zinc-800 leading-7 mb-2">
          <strong>Architecture + delivery:</strong> I design platform direction and execute implementation details.
        </p>
        <p className="text-zinc-800 leading-7 mb-2">
          <strong>Applied AI discipline:</strong> I treat <em>prompting, evaluation, and cost controls</em> as production engineering.
        </p>
        <p className="text-zinc-800 leading-7">
          <strong>Enterprise credibility:</strong> I partner directly with executives and technical teams to turn ambiguity into shipped outcomes.
        </p>
      </article>
    </section>
  );
}

function ResumeView() {
  return (
    <section className="space-y-5">
      <article className="rounded-sm border border-zinc-300 bg-white p-5 md:p-6 shadow-sm">
        <h2 className="font-heading font-bold text-3xl mb-3">Summary</h2>
        <p className="text-zinc-800 leading-7">{resumePdfSummary}</p>
      </article>

      <article className="rounded-sm border border-zinc-300 bg-white p-5 md:p-6 shadow-sm">
        <h2 className="font-heading font-bold text-3xl mb-4">Core Skills</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {resumePdfSkillClusters.map((cluster) => (
            <div key={cluster.title} className="rounded border border-zinc-300 bg-zinc-50 p-3">
              <p className="font-heading font-bold text-lg mb-1">{cluster.title}</p>
              <p className="text-zinc-700 leading-6">
                <em>{cluster.details}</em>
              </p>
            </div>
          ))}
        </div>
      </article>

      <article className="rounded-sm border border-zinc-300 bg-white p-5 md:p-6 shadow-sm">
        <h2 className="font-heading font-bold text-3xl mb-4">Experience</h2>
        <div className="space-y-5">
          {resumePdfExperience.map((entry) => (
            <div key={entry.company} className="border-l-2 border-zinc-300 pl-4">
              <h3 className="font-heading font-bold text-2xl">{entry.company}</h3>
              <p className="text-sm text-zinc-600 mb-2">{entry.role} • {entry.location}</p>
              <ul className="list-disc list-inside space-y-1 text-zinc-800 leading-7">
                {entry.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </article>

      <article className="rounded-sm border border-zinc-300 bg-white p-5 md:p-6 shadow-sm">
        <h2 className="font-heading font-bold text-3xl mb-4">Select AI and Engineering Projects</h2>
        <ul className="space-y-3 text-zinc-800 leading-7">
          {resumePdfProjects.map((project) => (
            <li key={project.name} className="border-l-2 border-zinc-300 pl-4">
              <strong>{project.name}:</strong> {project.detail}
            </li>
          ))}
        </ul>
      </article>

      <article className="rounded-sm border border-zinc-300 bg-zinc-50 p-5 md:p-6 shadow-sm">
        <h2 className="font-heading font-bold text-2xl mb-3">Education and Certifications</h2>
        <ul className="list-disc list-inside space-y-1 text-zinc-800 leading-7">
          {educationAndCerts.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>

      <article className="rounded-sm border border-zinc-300 bg-zinc-50 p-5 md:p-6 shadow-sm">
        <h2 className="font-heading font-bold text-2xl mb-3">{currentWork.title}</h2>
        <p className="text-zinc-700 mb-2">
          <strong>{currentWork.role}</strong> • {currentWork.company} • {currentWork.dates}
        </p>
        <ul className="list-disc list-inside space-y-1 text-zinc-800 leading-7">
          <li>{currentWork.bullets[0]}</li>
        </ul>
      </article>
    </section>
  );
}

function DeepResumeView({ level }: { level: 2 | 3 }) {
  const deepConfig = useMemo(() => deepConfigFor(level), [level]);
  const notesByCompany = useMemo(
    () => new Map(resumeExpandedExperienceNotes.map((entry) => [entry.company, entry.notes])),
    []
  );

  return (
    <section className="space-y-5">
      <WhyTeamsHireMe />

      <article className="rounded-sm border border-zinc-300 bg-white p-5 md:p-6 shadow-sm">
        <h2 className="font-heading font-bold text-3xl mb-4">Core Experience</h2>
        <div className="space-y-5">
          {experience.map((entry) => {
            const extraNotes = notesByCompany.get(entry.company) ?? [];

            return (
              <div key={entry.company} className="border-l-2 border-zinc-300 pl-4">
                <h3 className="font-heading font-bold text-2xl">{entry.company}</h3>
                <p className="text-sm text-zinc-600 mb-2">{entry.role} • {entry.dates} • {entry.location}</p>
                <ul className="list-disc list-inside space-y-1 text-zinc-800 leading-7">
                  {entry.bullets.slice(0, deepConfig.experienceBullets).map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                {extraNotes.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm uppercase tracking-wide text-zinc-600 mb-1">Additional context</p>
                    <ul className="list-disc list-inside space-y-1 text-zinc-700 leading-6">
                      {extraNotes.slice(0, deepConfig.extraNotes).map((note) => (
                        <li key={note}>
                          <em>{note}</em>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </article>

      <article className="rounded-sm border border-zinc-300 bg-white p-5 md:p-6 shadow-sm">
        <h2 className="font-heading font-bold text-3xl mb-4">AI and Software Deliverables</h2>
        <div className="space-y-5">
          {resumeExpandedProjects.slice(0, deepConfig.projectCount).map((project) => (
            <div key={project.name} className="rounded border border-zinc-300 bg-zinc-50 p-4">
              <h3 className="font-heading font-bold text-2xl mb-2">{project.name}</h3>
              <p className="text-zinc-800 leading-7 mb-2">
                <strong>Problem:</strong> {project.problem}
              </p>
              <div className="grid gap-4 lg:grid-cols-2">
                <div>
                  <p className="font-heading font-bold text-sm uppercase tracking-wide mb-1">Approach</p>
                  <ul className="list-disc list-inside space-y-1 text-zinc-800 leading-7">
                    {project.approach.slice(0, deepConfig.approachBullets).map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-heading font-bold text-sm uppercase tracking-wide mb-1">Outcome</p>
                  <ul className="list-disc list-inside space-y-1 text-zinc-800 leading-7">
                    {project.outcomes.slice(0, deepConfig.outcomeBullets).map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="text-sm text-zinc-600 mt-2">
                <strong>Stack:</strong> <em>{project.tools.join(' • ')}</em>
              </p>
            </div>
          ))}
        </div>
      </article>

      <article className="rounded-sm border border-zinc-300 bg-zinc-50 p-5 md:p-6 shadow-sm">
        <h2 className="font-heading font-bold text-2xl mb-3">{currentWork.title}</h2>
        <p className="text-zinc-700 mb-2">
          <strong>{currentWork.role}</strong> • {currentWork.company} • {currentWork.dates}
        </p>
        <ul className="list-disc list-inside space-y-1 text-zinc-800 leading-7">
          {currentWork.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
          {currentWorkExtendedBullets.slice(0, deepConfig.currentWorkBullets - 1).map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </article>

      <article className="rounded-sm border border-zinc-300 bg-zinc-50 p-5 md:p-6 shadow-sm">
        <h2 className="font-heading font-bold text-2xl mb-3">Skill Clusters</h2>
        <div className="space-y-2 text-zinc-800 leading-7">
          {skillGroups.map((group) => (
            <p key={group.title}>
              <strong>{group.title}:</strong> <em>{group.skills.join(', ')}</em>
            </p>
          ))}
        </div>
      </article>

      <article className="rounded-sm border border-zinc-300 bg-white p-5 md:p-6 shadow-sm">
        <h2 className="font-heading font-bold text-2xl mb-3">What People Say</h2>
        <div className="space-y-3">
          {resumeQuoteLibrary.slice(0, deepConfig.quoteCount).map((item) => (
            <blockquote key={item.quote} className="border-l-2 border-zinc-300 pl-4 italic text-zinc-800 leading-7">
              “{item.quote}”
              <footer className="not-italic text-sm text-zinc-600 mt-1">— {item.attribution}</footer>
            </blockquote>
          ))}
        </div>
      </article>
    </section>
  );
}

export default function RoundTwoOptionB() {
  const [level, setLevel] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const rawLevel = new URLSearchParams(window.location.search).get('level');
    const parsed = Number(rawLevel);

    if (Number.isInteger(parsed) && parsed >= 0 && parsed <= 3) {
      setLevel(parsed);
    }
  }, []);

  return (
    <main className="py-8 md:py-10">
      <Container size="lg" className="space-y-5">
        <Card className="max-w-5xl mx-auto" padding="lg" hover={false}>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-neo-primary mb-1 transform -rotate-1">{resumeIdentity.name}</h1>
              <p className="text-base text-neo-text/80 max-w-3xl">
                Practical AI and analytics systems with measurable outcomes, clear architecture decisions, and delivery rigor.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href={resumePdfPath} variant="primary">Resume PDF</Button>
              <Button href={`mailto:${resumeIdentity.email}`} variant="secondary">Email</Button>
              <Button href={resumeIdentity.linkedin} variant="secondary">LinkedIn</Button>
            </div>
          </div>
        </Card>

        <ResumeDial level={level} onChange={setLevel} levels={dialLevels} />

        {level === 0 && <QuickBiteView />}
        {level === 1 && <ResumeView />}
        {level === 2 && <DeepResumeView level={2} />}
        {level === 3 && <DeepResumeView level={3} />}

        {level > 0 && (
          <section className="max-w-5xl mx-auto">
            <article className="rounded-sm border border-zinc-300 bg-zinc-50 p-5 md:p-6 shadow-sm text-center">
              <h2 className="font-heading font-bold text-2xl mb-2">Let&apos;s build something practical and ambitious.</h2>
              <p className="text-zinc-700 mb-3">Email and LinkedIn are the fastest paths for outreach.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button href={`mailto:${resumeIdentity.email}`} variant="primary">Email</Button>
                <Button href={resumeIdentity.linkedin} variant="secondary">LinkedIn</Button>
                <Button href={resumePdfPath} variant="secondary">Download PDF</Button>
              </div>
            </article>
          </section>
        )}
      </Container>
    </main>
  );
}
