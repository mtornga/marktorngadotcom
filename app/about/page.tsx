'use client';

import { useState } from 'react';
import Container from '@/components/layout/Container';
import ResumeDial from '@/components/resume/ResumeDial';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

export default function AboutPage() {
  const [level, setLevel] = useState(0);

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
          Software engineer and creative technologist based in St. Louis, Missouri.
        </p>
        <div className="flex flex-wrap gap-3">
          <Badge variant="primary">Full-Stack Development</Badge>
          <Badge variant="accent">Computer Vision</Badge>
          <Badge variant="secondary">System Design</Badge>
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
          Software engineer specializing in full-stack development, computer vision,
          and spatial intelligence systems. Based in St. Louis, Missouri.
        </p>
        <div className="flex flex-wrap gap-3">
          <Badge variant="primary">TypeScript/Python</Badge>
          <Badge variant="accent">Computer Vision</Badge>
          <Badge variant="secondary">AWS/Cloud</Badge>
          <Badge variant="primary">React/Next.js</Badge>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="border-4 border-neo-text bg-neo-secondary p-8 shadow-neo">
        <h3 className="font-heading font-bold text-3xl mb-6 text-neo-primary">
          Featured Work
        </h3>
        <div className="space-y-4">
          <div className="border-l-4 border-neo-primary pl-4">
            <h4 className="font-heading font-bold text-xl mb-2">
              DeerAI Tracking Response
            </h4>
            <p className="text-neo-text/80 mb-2">
              Full-stack spatial intelligence platform for wildlife management using
              real-time computer vision and autonomous tracking systems.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">PyTorch</Badge>
              <Badge variant="default">YOLO</Badge>
              <Badge variant="default">AWS</Badge>
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
            <h4 className="font-bold text-lg mb-3">Languages & Frameworks</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">TypeScript</Badge>
              <Badge variant="default">Python</Badge>
              <Badge variant="default">React</Badge>
              <Badge variant="default">Next.js</Badge>
              <Badge variant="default">Node.js</Badge>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-3">Specializations</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Computer Vision</Badge>
              <Badge variant="default">ML/AI</Badge>
              <Badge variant="default">Real-time Systems</Badge>
              <Badge variant="default">Cloud Architecture</Badge>
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
        <p className="text-lg mb-4">
          St. Louis, Missouri
        </p>
        <p className="text-lg mb-6 leading-relaxed">
          Software engineer with expertise in full-stack development, computer vision,
          and spatial intelligence systems. Passionate about building innovative solutions
          at the intersection of software and hardware, with a focus on real-time systems,
          autonomous technologies, and creative applications of machine learning.
        </p>
        <div className="flex flex-wrap gap-3">
          <Badge variant="primary">Full-Stack Development</Badge>
          <Badge variant="accent">Computer Vision</Badge>
          <Badge variant="secondary">System Architecture</Badge>
          <Badge variant="primary">Real-time Systems</Badge>
          <Badge variant="accent">ML/AI</Badge>
        </div>
      </section>

      {/* Experience */}
      <section className="border-4 border-neo-text bg-neo-secondary p-8 shadow-neo">
        <h3 className="font-heading font-bold text-3xl mb-6 text-neo-primary">
          Professional Experience
        </h3>
        <div className="space-y-6">
          {/* Add your actual experience here */}
          <div className="border-l-4 border-neo-primary pl-6">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-heading font-bold text-xl">Your Role</h4>
                <p className="text-neo-text/80">Company Name</p>
              </div>
              <Badge variant="default">2020 - Present</Badge>
            </div>
            <p className="mb-3 text-neo-text/90">
              Description of your role and key responsibilities...
            </p>
            <ul className="list-disc list-inside space-y-1 text-neo-text/80">
              <li>Key achievement or responsibility #1</li>
              <li>Key achievement or responsibility #2</li>
              <li>Key achievement or responsibility #3</li>
            </ul>
          </div>

          {/* Add more experience entries as needed */}
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
              A full-stack spatial intelligence platform for wildlife management combining
              real-time computer vision, autonomous tracking systems, and cloud infrastructure.
              Built with PyTorch, YOLO object detection, and AWS services for scalable
              real-time processing.
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="default">PyTorch</Badge>
              <Badge variant="default">YOLO</Badge>
              <Badge variant="default">Robotics</Badge>
              <Badge variant="default">Real-time Tracking</Badge>
              <Badge variant="default">AWS</Badge>
            </div>
            <Button href="/portfolio/deeraitrackingresponse" variant="primary">
              View Project Details
            </Button>
          </div>

          {/* Add more projects */}
        </div>
      </section>

      {/* Technical Skills */}
      <section className="border-4 border-neo-text bg-neo-secondary p-8 shadow-neo">
        <h3 className="font-heading font-bold text-3xl mb-6 text-neo-primary">
          Technical Skills
        </h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-lg mb-3">Languages</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">TypeScript</Badge>
              <Badge variant="default">JavaScript</Badge>
              <Badge variant="default">Python</Badge>
              <Badge variant="default">SQL</Badge>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-3">Frontend</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">React</Badge>
              <Badge variant="default">Next.js</Badge>
              <Badge variant="default">Tailwind CSS</Badge>
              <Badge variant="default">HTML/CSS</Badge>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-3">Backend & Infrastructure</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Node.js</Badge>
              <Badge variant="default">AWS</Badge>
              <Badge variant="default">Docker</Badge>
              <Badge variant="default">PostgreSQL</Badge>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-3">Computer Vision & ML</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">PyTorch</Badge>
              <Badge variant="default">YOLO</Badge>
              <Badge variant="default">OpenCV</Badge>
              <Badge variant="default">TensorFlow</Badge>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-3">Tools & Methodologies</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Git</Badge>
              <Badge variant="default">CI/CD</Badge>
              <Badge variant="default">Agile</Badge>
              <Badge variant="default">System Design</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="border-4 border-neo-text bg-neo-bg p-8 shadow-neo">
        <h3 className="font-heading font-bold text-3xl mb-6 text-neo-primary">
          Education
        </h3>
        <div className="border-l-4 border-neo-primary pl-6">
          <h4 className="font-heading font-bold text-xl mb-2">Your Degree</h4>
          <p className="text-neo-text/80 mb-2">University Name</p>
          <Badge variant="default">Year</Badge>
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
