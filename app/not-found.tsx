import Container from '@/components/layout/Container';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <main className="py-20 min-h-[60vh] flex items-center">
      <Container size="md">
        <Card className="text-center" padding="lg">
          <div className="text-8xl font-heading font-bold text-neo-primary mb-6 transform -rotate-2">
            404
          </div>
          <h1 className="font-heading font-bold text-3xl mb-4">
            Page Not Found
          </h1>
          <p className="text-xl text-neo-text/80 mb-8 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href="/" variant="primary">
              Go Home
            </Button>
            <Button href="/portfolio" variant="secondary">
              View Portfolio
            </Button>
            <Button href="/contact" variant="accent">
              Contact Me
            </Button>
          </div>
        </Card>
      </Container>
    </main>
  );
}
