import { buildSeoMetadata } from '../../lib/seo';

export const metadata = buildSeoMetadata({
  title: 'Book An Appointment - Medhostech | Schedule a Demo',
  description:
    'Schedule a demo or consultation with Medhostech. Book an appointment to learn how our EHR and healthcare management solutions can transform your practice.',
  path: '/make-appointment',
});

export default function MakeAppointmentLayout({ children }) {
  return children;
}
