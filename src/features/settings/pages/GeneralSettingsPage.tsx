import { useState, type FormEvent } from 'react';
import { ArrowLeft, Building2, CalendarClock, Globe2, type LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  PageHeader,
  Select,
  Textarea,
} from '@components';
import { ROUTES } from '@common/constants';
import type { SelectOption } from '@common/types';
import { cn } from '@lib/cn';

interface GeneralSection {
  id: string;
  label: string;
  icon: LucideIcon;
}

const SECTIONS: GeneralSection[] = [
  { id: 'company-profile', label: 'Company Profile', icon: Building2 },
  { id: 'regional', label: 'Regional', icon: Globe2 },
  { id: 'date-format', label: 'Date & Time Format', icon: CalendarClock },
];

const CURRENCY_OPTIONS: SelectOption[] = [
  { label: 'Indian Rupee (₹)', value: 'INR' },
  { label: 'US Dollar ($)', value: 'USD' },
  { label: 'Euro (€)', value: 'EUR' },
  { label: 'British Pound (£)', value: 'GBP' },
];

const TIME_ZONE_OPTIONS: SelectOption[] = [
  { label: 'Asia/Kolkata (IST)', value: 'Asia/Kolkata' },
  { label: 'Asia/Dubai (GST)', value: 'Asia/Dubai' },
  { label: 'Europe/London (GMT)', value: 'Europe/London' },
  { label: 'America/New_York (EST)', value: 'America/New_York' },
  { label: 'UTC', value: 'UTC' },
];

const DATE_FORMAT_OPTIONS: SelectOption[] = [
  { label: 'DD/MM/YYYY', value: 'DD/MM/YYYY' },
  { label: 'MM/DD/YYYY', value: 'MM/DD/YYYY' },
  { label: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
];

const TIME_FORMAT_OPTIONS: SelectOption[] = [
  { label: '12-hour', value: '12h' },
  { label: '24-hour', value: '24h' },
];

export default function GeneralSettingsPage() {
  const [activeSection, setActiveSection] = useState<string>(SECTIONS[0].id);

  const [companyProfile, setCompanyProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [regional, setRegional] = useState({ currency: 'INR', timeZone: 'Asia/Kolkata' });
  const [dateFormat, setDateFormat] = useState({ dateFormat: 'DD/MM/YYYY', timeFormat: '24h' });

  const handleSectionClick = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSave = (event: FormEvent, message: string) => {
    event.preventDefault();
    toast.success(message);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="General Settings"
        description="Manage company profile, currency, time zone and date format."
        actions={
          <Link
            to={ROUTES.SETTINGS}
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to Settings
          </Link>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <Card className="h-fit p-2 lg:sticky lg:top-6">
          <nav className="flex flex-col pb-8">
            {SECTIONS.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => handleSectionClick(section.id)}
                  className={cn(
                    'relative flex w-full items-center gap-3 px-4 py-3.5 text-left text-sm transition-colors',
                    isActive
                      ? 'bg-primary/10 font-semibold text-foreground'
                      : 'font-medium text-muted-foreground hover:bg-muted hover:text-foreground',
                  )}
                >
                  <span
                    className={cn(
                      'absolute inset-y-0 left-0 w-3px',
                      isActive ? 'bg-primary' : 'bg-muted-foreground/70',
                    )}
                    aria-hidden
                  />
                  <section.icon className={cn('size-4 shrink-0', isActive && 'text-primary')} />
                  <span className="truncate">{section.label}</span>
                </button>
              );
            })}
          </nav>
        </Card>

        <div className="space-y-6">
          <Card id="company-profile" className="scroll-mt-6">
            <form onSubmit={(e) => handleSave(e, 'Company profile saved')}>
              <CardHeader className="border-b border-border pb-4">
                <CardTitle>Company Profile</CardTitle>
                <CardDescription>Basic details shown on invoices and documents.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label="Company Name"
                    value={companyProfile.name}
                    onChange={(e) =>
                      setCompanyProfile((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                  <Input
                    label="Support Email"
                    type="email"
                    value={companyProfile.email}
                    onChange={(e) =>
                      setCompanyProfile((prev) => ({ ...prev, email: e.target.value }))
                    }
                  />
                  <Input
                    label="Phone"
                    value={companyProfile.phone}
                    onChange={(e) =>
                      setCompanyProfile((prev) => ({ ...prev, phone: e.target.value }))
                    }
                  />
                </div>
                <Textarea
                  label="Address"
                  value={companyProfile.address}
                  onChange={(e) =>
                    setCompanyProfile((prev) => ({ ...prev, address: e.target.value }))
                  }
                />
              </CardContent>
              <CardFooter>
                <Button type="submit">Save changes</Button>
              </CardFooter>
            </form>
          </Card>

          <Card id="regional" className="scroll-mt-6">
            <form onSubmit={(e) => handleSave(e, 'Regional settings saved')}>
              <CardHeader className="border-b border-border pb-4">
                <CardTitle>Regional Settings</CardTitle>
                <CardDescription>Currency and time zone used across the app.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <Select
                  label="Currency"
                  options={CURRENCY_OPTIONS}
                  value={regional.currency}
                  onChange={(e) => setRegional((prev) => ({ ...prev, currency: e.target.value }))}
                />
                <Select
                  label="Time Zone"
                  options={TIME_ZONE_OPTIONS}
                  value={regional.timeZone}
                  onChange={(e) => setRegional((prev) => ({ ...prev, timeZone: e.target.value }))}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit">Save changes</Button>
              </CardFooter>
            </form>
          </Card>

          <Card id="date-format" className="scroll-mt-6">
            <form onSubmit={(e) => handleSave(e, 'Date & time format saved')}>
              <CardHeader className="border-b border-border pb-4">
                <CardTitle>Date & Time Format</CardTitle>
                <CardDescription>How dates and times are displayed across the app.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <Select
                  label="Date Format"
                  options={DATE_FORMAT_OPTIONS}
                  value={dateFormat.dateFormat}
                  onChange={(e) =>
                    setDateFormat((prev) => ({ ...prev, dateFormat: e.target.value }))
                  }
                />
                <Select
                  label="Time Format"
                  options={TIME_FORMAT_OPTIONS}
                  value={dateFormat.timeFormat}
                  onChange={(e) =>
                    setDateFormat((prev) => ({ ...prev, timeFormat: e.target.value }))
                  }
                />
              </CardContent>
              <CardFooter>
                <Button type="submit">Save changes</Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
