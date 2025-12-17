'use client';

import { useState } from 'react';
import Container from '@/components/layout/Container';
import ResumeDial from '@/components/resume/ResumeDial';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

export default function AboutPage() {
  // Default to Medium (2) so there's meaningful content on initial render
  const [level, setLevel] = useState(2);

  return (
    <Container size="lg">
      <div className="py-12">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="font-heading font-bold text-5xl md:text-6xl mb-4 text-neo-primary transform -rotate-1">
            About Mark
          </h1>
          <p className="text-xl text-neo-text/80">
            Adjust the dial to control resume detail level
          </p>
        </div>

        {/* Resume Dial */}
        <ResumeDial level={level} onChange={setLevel} />

        {/* Resume Content - Changes based on level */}
        <div className="max-w-3xl mx-auto">
          {level === 0 && <MinimalResume />}
          {level === 1 && <ShortResume />}
          {level === 2 && <MediumResume />}
          {level === 3 && <LongResume />}
        </div>
      </div>
    </Container>
  );
}

function MinimalResume() {
  return (
    <div className="text-center py-16 animate-fadeIn">
      <div className="inline-block border-8 border-neo-text bg-neo-accent p-8 shadow-neo transform -rotate-1">
        <p className="font-heading font-bold text-4xl md:text-5xl">
          Highly extensible human
        </p>
      </div>
      <p className="mt-8 text-lg text-neo-text/60">
        Turn the dial for more details →
      </p>
    </div>
  );
}

function ShortResume() {
  return (
    <div className="space-y-8 py-8 animate-fadeIn">
      {/* Quick Intro */}
      <section className="border-4 border-neo-text bg-neo-bg p-6 shadow-neo">
        <h2 className="font-heading font-bold text-3xl mb-4 text-neo-primary">
          Highly extensible human
        </h2>
        <p className="text-lg mb-4">
          Data analytics leader and software engineer based in Ballwin, MO. 
          Building enterprise data platforms by day, computer vision robots by night.
        </p>
        <div className="flex flex-wrap gap-3">
          <Badge variant="primary">Data Engineering</Badge>
          <Badge variant="accent">Computer Vision</Badge>
          <Badge variant="secondary">AI/ML</Badge>
        </div>
      </section>

      {/* Quick Links */}
      <section className="border-4 border-neo-text bg-neo-secondary p-6 shadow-neo">
        <h3 className="font-heading font-bold text-2xl mb-4">Connect</h3>
        <div className="flex flex-wrap gap-4">
          <Button href="https://github.com/mtornga" variant="primary">
            GitHub
          </Button>
          <Button href="https://linkedin.com/in/marktornga" variant="primary">
            LinkedIn
          </Button>
        </div>
      </section>
    </div>
  );
}

function MediumResume() {
  return (
    <div className="space-y-8 py-8 animate-fadeIn">
      {/* Header */}
      <section className="border-4 border-neo-text bg-neo-bg p-8 shadow-neo">
        <h2 className="font-heading font-bold text-4xl mb-2 text-neo-primary">
          Mark Tornga
        </h2>
        <p className="text-xl mb-4 text-neo-text/80">
          Highly extensible human
        </p>
        <p className="text-lg mb-6">
          Senior Manager of Data Analytics with 9+ years building enterprise BI ecosystems, 
          leading data modernization initiatives, and shipping AI-powered solutions. 
          Currently exploring computer vision and robotics in personal projects.
        </p>
        <div className="flex flex-wrap gap-3">
          <Badge variant="primary">Microsoft Fabric</Badge>
          <Badge variant="accent">Python</Badge>
          <Badge variant="secondary">Power BI</Badge>
          <Badge variant="primary">Azure AI</Badge>
          <Badge variant="accent">PyTorch</Badge>
        </div>
      </section>

      {/* Featured Work */}
      <section className="border-4 border-neo-text bg-neo-secondary p-8 shadow-neo">
        <h3 className="font-heading font-bold text-3xl mb-6 text-neo-primary">
          Featured Work
        </h3>
        <div className="space-y-6">
          <div className="border-l-4 border-neo-primary pl-4">
            <h4 className="font-heading font-bold text-xl mb-2">
              DeerAI Tracking Response
            </h4>
            <p className="text-neo-text/80 mb-2">
              Full-stack computer vision pipeline for wildlife monitoring with YOLO detection, 
              multi-object tracking, and autonomous robotic navigation.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">PyTorch</Badge>
              <Badge variant="default">YOLO</Badge>
              <Badge variant="default">Robotics</Badge>
            </div>
          </div>
          <div className="border-l-4 border-neo-accent pl-4">
            <h4 className="font-heading font-bold text-xl mb-2">
              Enterprise AI Initiatives
            </h4>
            <p className="text-neo-text/80 mb-2">
              Led multiple LLM-powered projects: AI training games, OCR product description automation, 
              and an LLM-based lead categorization system with 85% cost reduction.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Azure AI Foundry</Badge>
              <Badge variant="default">GPT-4</Badge>
              <Badge variant="default">Microsoft Fabric</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="border-4 border-neo-text bg-neo-bg p-8 shadow-neo">
        <h3 className="font-heading font-bold text-3xl mb-6 text-neo-primary">
          Technical Skills
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold text-lg mb-3">Data & Analytics</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Microsoft Fabric</Badge>
              <Badge variant="default">Power BI</Badge>
              <Badge variant="default">Snowflake</Badge>
              <Badge variant="default">dbt</Badge>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-3">AI & Computer Vision</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">PyTorch</Badge>
              <Badge variant="default">YOLO</Badge>
              <Badge variant="default">Azure AI</Badge>
              <Badge variant="default">LLMs</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="border-4 border-neo-text bg-neo-accent p-8 shadow-neo transform rotate-1">
        <h3 className="font-heading font-bold text-3xl mb-4">Get in Touch</h3>
        <div className="flex flex-wrap gap-4">
          <Button href="https://github.com/mtornga" variant="primary">
            GitHub
          </Button>
          <Button href="https://linkedin.com/in/marktornga" variant="primary">
            LinkedIn
          </Button>
        </div>
      </section>
    </div>
  );
}

function LongResume() {
  return (
    <div className="space-y-8 py-8 animate-fadeIn">
      {/* Header */}
      <section className="border-4 border-neo-text bg-neo-bg p-8 shadow-neo">
        <h2 className="font-heading font-bold text-4xl mb-2 text-neo-primary">
          Mark Tornga
        </h2>
        <p className="text-xl mb-4 text-neo-text/80">
          Highly extensible human
        </p>
        <p className="text-lg mb-2">
          Ballwin, MO • mtornga@gmail.com
        </p>
        <p className="text-lg mb-6 leading-relaxed">
          Senior data analytics leader with 9+ years of experience building enterprise BI platforms, 
          leading data modernization initiatives, and delivering AI-powered solutions. Passionate about 
          the intersection of data, machine learning, and real-world systems—from enterprise Microsoft Fabric 
          deployments to personal computer vision and robotics research.
        </p>
        <div className="flex flex-wrap gap-3">
          <Badge variant="primary">Data Engineering</Badge>
          <Badge variant="accent">AI/ML</Badge>
          <Badge variant="secondary">Computer Vision</Badge>
          <Badge variant="primary">Leadership</Badge>
          <Badge variant="accent">Cloud Architecture</Badge>
        </div>
      </section>

      {/* Experience */}
      <section className="border-4 border-neo-text bg-neo-secondary p-8 shadow-neo">
        <h3 className="font-heading font-bold text-3xl mb-6 text-neo-primary">
          Professional Experience
        </h3>
        <div className="space-y-8">
          {/* Core & Main */}
          <div className="border-l-4 border-neo-primary pl-6">
            <div className="flex flex-wrap justify-between items-start mb-2 gap-2">
              <div>
                <h4 className="font-heading font-bold text-xl">Senior Manager, Data Analytics</h4>
                <p className="text-neo-text/80">Core & Main • St. Louis, MO</p>
              </div>
              <Badge variant="default">2023 – 2025</Badge>
            </div>
            <p className="mb-3 text-neo-text/90">
              Led enterprise BI modernization for a Fortune 500 waterworks distributor, building 
              Core & Main&apos;s data ecosystem on Microsoft Fabric.
            </p>
            <ul className="list-disc list-inside space-y-1 text-neo-text/80">
              <li>Migrated fragmented tools into a Microsoft Fabric–based data estate, accelerating BI maturity by a decade in under two years</li>
              <li>Integrated Microsoft D365 Finance & Operations: researched 200+ tables, built bronze→silver→gold data pipelines in PySpark</li>
              <li>Led AI initiatives: LLM training games, GPT-4 product descriptions (300 hrs saved), lead categorization system (ROI in thousands of %)</li>
              <li>Partnered with C-suite to define data strategy; enabled hundreds of analysts to self-serve governed data</li>
            </ul>
          </div>

          {/* Slalom */}
          <div className="border-l-4 border-neo-accent pl-6">
            <div className="flex flex-wrap justify-between items-start mb-2 gap-2">
              <div>
                <h4 className="font-heading font-bold text-xl">Senior Consultant</h4>
                <p className="text-neo-text/80">Slalom, Inc • St. Louis, MO</p>
              </div>
              <Badge variant="default">2018 – 2023</Badge>
            </div>
            <p className="mb-3 text-neo-text/90">
              Delivered data & analytics solutions to 8 clients across 18 engagements in financial services, 
              energy, communications, and healthcare.
            </p>
            <ul className="list-disc list-inside space-y-1 text-neo-text/80">
              <li>Designated 2020 Slalom-Tableau Rockstar; led a 420-attendee analytics webinar series</li>
              <li>Built cybersecurity risk dashboard for $16B insurance company board (22 metrics, 16 data sources)</li>
              <li>Reduced insurance claims backlog from 23,000 to 8,000 in 90 days with automated SQL solutions</li>
              <li>1st place, 2023 Slalom D&A Hackathon (Python, Google Maps API, BigQuery, Tableau)</li>
            </ul>
          </div>

          {/* Unyson */}
          <div className="border-l-4 border-neo-primary pl-6">
            <div className="flex flex-wrap justify-between items-start mb-2 gap-2">
              <div>
                <h4 className="font-heading font-bold text-xl">Manager, Business Intelligence</h4>
                <p className="text-neo-text/80">Unyson Logistics • St. Louis, MO</p>
              </div>
              <Badge variant="default">2016 – 2018</Badge>
            </div>
            <p className="mb-3 text-neo-text/90">
              Built and led a team of 11 analysts, designed curriculum, and delivered BI solutions 
              for logistics operations.
            </p>
            <ul className="list-disc list-inside space-y-1 text-neo-text/80">
              <li>Managed recruitment, training, and mentorship of 11-person analyst team</li>
              <li>Created reporting used daily in retailer cross-docking operations for 5+ years</li>
              <li>Assisted Oracle Transportation Management migration from IBM TMS</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="border-4 border-neo-text bg-neo-bg p-8 shadow-neo">
        <h3 className="font-heading font-bold text-3xl mb-6 text-neo-primary">
          Featured Projects
        </h3>
        <div className="space-y-6">
          <div className="border-l-4 border-neo-accent pl-6">
            <h4 className="font-heading font-bold text-xl mb-2">
              DeerAI Tracking Response
            </h4>
            <p className="text-neo-text/90 mb-3">
              End-to-end computer vision pipeline for wildlife monitoring: RTSP stream ingestion, 
              YOLO/RT-DETR detection, multi-object tracking, re-identification, predictive movement 
              modeling, and autonomous robotic navigation using AprilTag calibration.
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="default">PyTorch</Badge>
              <Badge variant="default">YOLO</Badge>
              <Badge variant="default">OpenCV</Badge>
              <Badge variant="default">Robotics</Badge>
              <Badge variant="default">RunPod GPU</Badge>
            </div>
            <Button href="/portfolio/deeraitrackingresponse" variant="primary">
              View Project Details
            </Button>
          </div>

          <div className="border-l-4 border-neo-primary pl-6">
            <h4 className="font-heading font-bold text-xl mb-2">
              LLM Interaction Learning Games
            </h4>
            <p className="text-neo-text/90 mb-3">
              Two interactive games teaching enterprise AI skills: data parsing with prompts at scale, 
              and OCR vs human data entry races. Built with GitHub Copilot, Azure AI Foundry integration.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Azure AI Foundry</Badge>
              <Badge variant="default">GPT-5</Badge>
              <Badge variant="default">JavaScript</Badge>
            </div>
          </div>

          <div className="border-l-4 border-neo-accent pl-6">
            <h4 className="font-heading font-bold text-xl mb-2">
              Fire Protection Lead Intelligence
            </h4>
            <p className="text-neo-text/90 mb-3">
              LLM-powered system categorizing 1M+ annual bids into fire-protection-eligible projects. 
              Two-pass LLM architecture reduced costs by 85% while generating high-confidence sales leads 
              with demonstrable revenue impact.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Azure AI</Badge>
              <Badge variant="default">Microsoft Fabric</Badge>
              <Badge variant="default">Python</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-4 border-neo-text bg-neo-secondary p-8 shadow-neo transform -rotate-1">
        <h3 className="font-heading font-bold text-3xl mb-6 text-neo-primary">
          What People Say
        </h3>
        <div className="space-y-6">
          <blockquote className="border-l-4 border-neo-accent pl-4 italic text-neo-text/90">
            &ldquo;Mark was instrumental to the work... By the end of the engagement, one of our toughest 
            stakeholders was saying &apos;I wish we were able to keep Mark around a little longer.&apos; 
            We watched this team&apos;s backlog shrink from 23,000 to 8,000. To quote the client, 
            &apos;I don&apos;t think we could have ever gotten out from underneath these without this work.&apos;&rdquo;
            <footer className="mt-2 text-neo-text/70 not-italic">— Senior Principal, Slalom</footer>
          </blockquote>
          <blockquote className="border-l-4 border-neo-primary pl-4 italic text-neo-text/90">
            &ldquo;What stands out most about Mark is his poise in tough situations... His composure under 
            pressure translated into client confidence. I&apos;m comfortable saying there is not a problem 
            you could put in front of Mark that he couldn&apos;t figure out.&rdquo;
            <footer className="mt-2 text-neo-text/70 not-italic">— Senior Delivery Principal, Slalom</footer>
          </blockquote>
        </div>
      </section>

      {/* Technical Skills */}
      <section className="border-4 border-neo-text bg-neo-bg p-8 shadow-neo">
        <h3 className="font-heading font-bold text-3xl mb-6 text-neo-primary">
          Technical Skills
        </h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-lg mb-3">Data Platforms</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Microsoft Fabric</Badge>
              <Badge variant="default">Power BI</Badge>
              <Badge variant="default">Snowflake</Badge>
              <Badge variant="default">dbt</Badge>
              <Badge variant="default">Airflow</Badge>
              <Badge variant="default">Synapse</Badge>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-3">Languages & Frameworks</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Python</Badge>
              <Badge variant="default">SQL</Badge>
              <Badge variant="default">PySpark</Badge>
              <Badge variant="default">TypeScript</Badge>
              <Badge variant="default">React</Badge>
              <Badge variant="default">Next.js</Badge>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-3">AI & Computer Vision</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Azure AI Foundry</Badge>
              <Badge variant="default">PyTorch</Badge>
              <Badge variant="default">YOLO</Badge>
              <Badge variant="default">OpenCV</Badge>
              <Badge variant="default">LLMs/GPT</Badge>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-3">Cloud & Infrastructure</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">AWS</Badge>
              <Badge variant="default">Azure</Badge>
              <Badge variant="default">GCP</Badge>
              <Badge variant="default">Docker</Badge>
              <Badge variant="default">Terraform</Badge>
              <Badge variant="default">Git</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="border-4 border-neo-text bg-neo-secondary p-8 shadow-neo">
        <h3 className="font-heading font-bold text-3xl mb-6 text-neo-primary">
          Education & Certifications
        </h3>
        <div className="space-y-4">
          <div className="border-l-4 border-neo-primary pl-6">
            <h4 className="font-heading font-bold text-xl mb-1">B.A. Supply Chain Management</h4>
            <p className="text-neo-text/80">Michigan State University</p>
          </div>
          <div className="border-l-4 border-neo-accent pl-6">
            <h4 className="font-heading font-bold text-xl mb-1">Data Analytics Certification</h4>
            <p className="text-neo-text/80">Saint Louis University</p>
          </div>
          <div className="mt-4">
            <h4 className="font-bold text-lg mb-3">Industry Certifications</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">AWS Solutions Architect</Badge>
              <Badge variant="default">Tableau Certified</Badge>
              <Badge variant="default">Astronomer Airflow</Badge>
              <Badge variant="default">Azure Fundamentals</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="border-4 border-neo-text bg-neo-accent p-8 shadow-neo transform rotate-1">
        <h3 className="font-heading font-bold text-3xl mb-4">Connect</h3>
        <p className="mb-4 text-lg">
          Interested in working together or want to learn more?
        </p>
        <div className="flex flex-wrap gap-4">
          <Button href="https://github.com/mtornga" variant="primary">
            GitHub
          </Button>
          <Button href="https://linkedin.com/in/marktornga" variant="primary">
            LinkedIn
          </Button>
        </div>
      </section>
    </div>
  );
}
