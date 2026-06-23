import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MapPin, Briefcase, DollarSign, Building, Clock, ArrowLeft, Heart, Share2 } from 'lucide-react';
import Link from 'next/link';

export default function JobDetailsPage({ params }: { params: { jobId: string } }) {
  // Mock data representing the fetched job
  const job = {
    id: params.jobId,
    title: 'Senior Software Engineer',
    company: 'TechFlow Inc.',
    location: 'San Francisco, CA (Remote)',
    type: 'Full-time',
    salary: '$130,000 - $160,000',
    postedAt: '2 days ago',
    description: 'We are looking for an experienced Senior Software Engineer to join our core product team. You will be responsible for architecting and building highly scalable services that power our global platform.',
    responsibilities: [
      'Design, build, and maintain efficient, reusable, and reliable Node.js code',
      'Ensure the best possible performance, quality, and responsiveness of applications',
      'Identify bottlenecks and bugs, and devise solutions to mitigate and address these issues',
      'Help maintain code quality, organization, and automatization'
    ],
    requirements: [
      '5+ years of experience building highly-scalable applications',
      'Deep understanding of Node.js and its core principles',
      'Familiarity with RESTful APIs and GraphQL',
      'Knowledge of modern authorization mechanisms, such as JSON Web Token'
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <Link href="/jobs" className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to jobs
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{job.title}</h1>
                  <p className="text-lg text-indigo-600 font-medium mt-2 flex items-center">
                    <Building className="w-5 h-5 mr-2" /> {job.company}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-indigo-600 bg-gray-50 hover:bg-indigo-50 rounded-full transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-indigo-600 bg-gray-50 hover:bg-indigo-50 rounded-full transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-6 pb-6 border-b border-gray-100">
                <span className="inline-flex items-center text-sm text-gray-700 bg-gray-100 px-3 py-1.5 rounded-md font-medium">
                  <MapPin className="w-4 h-4 mr-2 text-gray-500" /> {job.location}
                </span>
                <span className="inline-flex items-center text-sm text-gray-700 bg-gray-100 px-3 py-1.5 rounded-md font-medium">
                  <Briefcase className="w-4 h-4 mr-2 text-gray-500" /> {job.type}
                </span>
                <span className="inline-flex items-center text-sm text-green-800 bg-green-100 px-3 py-1.5 rounded-md font-medium">
                  <DollarSign className="w-4 h-4 mr-1 text-green-600" /> {job.salary}
                </span>
                <span className="inline-flex items-center text-sm text-gray-500 px-3 py-1.5">
                  <Clock className="w-4 h-4 mr-2" /> Posted {job.postedAt}
                </span>
              </div>

              <div className="mt-8 prose prose-indigo max-w-none">
                <h3 className="text-xl font-bold text-gray-900 mb-4">About the Role</h3>
                <p className="text-gray-600 leading-relaxed">{job.description}</p>
                
                <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Key Responsibilities</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  {job.responsibilities.map((req, i) => <li key={i}>{req}</li>)}
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Requirements</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  {job.requirements.map((req, i) => <li key={i}>{req}</li>)}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/3 space-y-6">
            {/* Apply Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Ready to join?</h3>
              <Link href="/login" className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-sm font-bold rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">
                Apply Now
              </Link>
              <p className="text-xs text-center text-gray-500 mt-4">
                You will be asked to create an account or log in to submit your application securely.
              </p>
            </div>

            {/* Company Info Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">About the Company</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-indigo-50 rounded-lg flex items-center justify-center text-xl font-bold text-indigo-600">
                  {job.company.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{job.company}</h4>
                  <Link href="#" className="text-sm text-indigo-600 hover:underline">View Company Profile</Link>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">TechFlow Inc. is a leading provider of cloud infrastructure solutions for the modern enterprise.</p>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex justify-between"><span>Founded</span> <span className="font-medium text-gray-900">2018</span></div>
                <div className="flex justify-between"><span>Employees</span> <span className="font-medium text-gray-900">200 - 500</span></div>
                <div className="flex justify-between"><span>Location</span> <span className="font-medium text-gray-900">San Francisco, CA</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Jobs Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Link key={i} href={`/jobs/${i}`} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-indigo-200 transition-all group">
                <h3 className="font-bold text-gray-900 group-hover:text-indigo-600">Full Stack Engineer</h3>
                <p className="text-sm text-gray-500 mt-1">Acme Corp &middot; Remote</p>
                <div className="mt-4 inline-flex px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded">
                  $140k - $180k
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
