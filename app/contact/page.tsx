import { Metadata } from 'next';
import Container from '@/components/layout/Container';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Contact | Mark Tornga',
  description: 'Get in touch for data architecture consulting, full-time opportunities, or just to connect.',
};

export default function ContactPage() {
  return (
    <main className="py-20">
      <Container size="md">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="text-neo-primary mb-6 transform -rotate-1">
            Let&apos;s Work Together
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Currently doing data architecture consulting. Open to full-time roles
            or consulting engagements.
          </p>
        </div>

        {/* Contact Options */}
        <div className="grid gap-8 md:grid-cols-2 mb-12">
          {/* Email */}
          <Card className="text-center" padding="lg">
            <div className="text-4xl mb-4">📧</div>
            <h2 className="font-heading font-bold text-2xl mb-2 text-neo-primary">
              Email
            </h2>
            <p className="text-neo-text/80 mb-6">
              Best for detailed inquiries, project discussions, or sharing context.
            </p>
            <Button
              href="mailto:mtornga@gmail.com"
              variant="primary"
              className="w-full"
            >
              mtornga@gmail.com
            </Button>
          </Card>

          {/* LinkedIn */}
          <Card className="text-center" padding="lg">
            <div className="text-4xl mb-4">💼</div>
            <h2 className="font-heading font-bold text-2xl mb-2 text-neo-primary">
              LinkedIn
            </h2>
            <p className="text-neo-text/80 mb-6">
              Connect professionally, see my full work history, or send a message.
            </p>
            <Button
              href="https://linkedin.com/in/marktornga"
              variant="primary"
              className="w-full"
            >
              Connect on LinkedIn
            </Button>
          </Card>
        </div>

        {/* What I Can Help With */}
        <Card className="mb-12" padding="lg">
          <h2 className="font-heading font-bold text-3xl mb-6 text-neo-primary">
            What I Can Help With
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="border-l-4 border-neo-accent pl-4">
              <h3 className="font-heading font-bold text-xl mb-2">
                Data Architecture & Strategy
              </h3>
              <p className="text-neo-text/80">
                Design modern data platforms, migrate legacy systems, build
                lakehouse architectures on Microsoft Fabric, Snowflake, or Databricks.
              </p>
            </div>
            <div className="border-l-4 border-neo-primary pl-4">
              <h3 className="font-heading font-bold text-xl mb-2">
                Analytics & BI
              </h3>
              <p className="text-neo-text/80">
                Build self-service analytics platforms, executive dashboards,
                semantic models, and data governance frameworks.
              </p>
            </div>
            <div className="border-l-4 border-neo-secondary pl-4">
              <h3 className="font-heading font-bold text-xl mb-2">
                AI/ML Implementation
              </h3>
              <p className="text-neo-text/80">
                LLM integrations, computer vision systems, document processing,
                and practical AI applications that deliver business value.
              </p>
            </div>
            <div className="border-l-4 border-neo-accent pl-4">
              <h3 className="font-heading font-bold text-xl mb-2">
                Team Building
              </h3>
              <p className="text-neo-text/80">
                Build and lead analytics teams, define career paths, create
                training programs, and establish data culture.
              </p>
            </div>
          </div>
        </Card>

        {/* GitHub */}
        <Card className="text-center bg-neo-secondary" padding="lg">
          <h2 className="font-heading font-bold text-2xl mb-4">
            See My Work
          </h2>
          <p className="text-neo-text/80 mb-6">
            Check out my open source projects and code samples on GitHub.
          </p>
          <Button href="https://github.com/mtornga" variant="primary">
            View GitHub Profile
          </Button>
        </Card>
      </Container>
    </main>
  );
}
