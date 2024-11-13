import React from 'react';
import { Shield, FileCheck, Clock, School } from 'lucide-react';
import '../../pages/Home/index.css'

export default function Home() {
  const handleNavigation = (path) => {
    // You can implement your navigation logic here
    console.log(`Navigating to: ${path}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Secure Document Verification for Educational Institutions
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Verify academic credentials instantly using our AI-powered system. 
            Designed specifically for detecting authentic marksheets and JEE results.
          </p>
          <button 
            onClick={() => handleNavigation('/upload')}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Start Verification
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Shield className="w-12 h-12 text-blue-600" />}
              title="AI-Powered Verification"
              description="Advanced machine learning algorithms to detect document authenticity with high accuracy"
            />
            <FeatureCard 
              icon={<Clock className="w-12 h-12 text-blue-600" />}
              title="Instant Results"
              description="Get verification results within minutes, saving valuable time in the admission process"
            />
            <FeatureCard 
              icon={<FileCheck className="w-12 h-12 text-blue-600" />}
              title="Multi-Document Support"
              description="Verify Class 10th, 12th marksheets and JEE results in one go"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <StepCard 
              number="1"
              title="Upload Documents"
              description="Upload your academic documents through our secure platform"
            />
            <StepCard 
              number="2"
              title="AI Analysis"
              description="Our AI system analyzes document patterns and security features"
            />
            <StepCard 
              number="3"
              title="Verification"
              description="Documents are cross-referenced with our database"
            />
            <StepCard 
              number="4"
              title="Results"
              description="Get detailed verification results instantly"
            />
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Trusted by Leading Institutions</h2>
          <div className="grid md:grid-cols-4 gap-8 items-center">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-center">
                <School className="w-16 h-16 text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Streamline Your Verification Process?
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Join hundreds of institutions using our platform for secure document verification
          </p>
          <button 
            onClick={() => handleNavigation('/upload')}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  );
}

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const StepCard = ({ number, title, description }) => (
  <div className="relative p-6">
    <div className="text-4xl font-bold text-blue-600 mb-4">{number}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);