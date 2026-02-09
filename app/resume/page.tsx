import type { Metadata } from 'next';
import RoundTwoOptionB from '@/components/resume/options/RoundTwoOptionB';

export const metadata: Metadata = {
  title: 'Resume | Mark Tornga',
  description:
    'Production resume for Mark Tornga: data architecture, AI implementation, enterprise analytics, and measurable delivery outcomes.',
  alternates: {
    canonical: '/resume',
  },
};

export default function ResumePage() {
  return <RoundTwoOptionB />;
}
