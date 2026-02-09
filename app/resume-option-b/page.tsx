import type { Metadata } from 'next';
import RoundTwoOptionB from '@/components/resume/options/RoundTwoOptionB';

export const metadata: Metadata = {
  title: 'Resume Draft B3 | Mark Tornga',
  description: 'Draft resume option B3: recruiter scan plus rebalanced depth levels.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ResumeOptionBPage() {
  return <RoundTwoOptionB />;
}
