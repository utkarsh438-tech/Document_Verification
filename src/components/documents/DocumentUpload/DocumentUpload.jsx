import { useState } from 'react';
import { Upload, AlertCircle, CheckCircle2, FileText, GraduationCap, ScrollText, FileCheck } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import '../DocumentUpload/Document.css'

const DocumentUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(null);
  const [documentType, setDocumentType] = useState('');

  const documentTypes = [
    {
      id: 'marksheet10',
      name: '10th Marksheet',
      description: 'Class 10 Final Examination Result',
      acceptedFormats: 'PDF/JPG/PNG',
      icon: <GraduationCap className="w-6 h-6 text-blue-500" />
    },
    {
      id: 'marksheet12',
      name: '12th Marksheet',
      description: 'Class 12 Final Examination Result',
      acceptedFormats: 'PDF/JPG/PNG',
      icon: <GraduationCap className="w-6 h-6 text-green-500" />
    },
    {
      id: 'jeeResult',
      name: 'JEE Result',
      description: 'Joint Entrance Examination Score Card',
      acceptedFormats: 'PDF only',
      icon: <ScrollText className="w-6 h-6 text-purple-500" />
    },
    {
      id: 'tc',
      name: 'Transfer Certificate',
      description: 'School Transfer Certificate',
      acceptedFormats: 'PDF/JPG/PNG',
      icon: <FileText className="w-6 h-6 text-orange-500" />
    },
    {
      id: 'domicile',
      name: 'Domicile Certificate',
      description: 'State Domicile/Residence Proof',
      acceptedFormats: 'PDF/JPG/PNG',
      icon: <FileCheck className="w-6 h-6 text-red-500" />
    }
  ];

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFileSelection(droppedFile);
  };

  const handleFileSelection = (selectedFile) => {
    if (selectedFile) {
      if (selectedFile.type === 'application/pdf' || selectedFile.type.startsWith('image/')) {
        setFile(selectedFile);
        setStatus('success');
      } else {
        setStatus('error');
      }
    }
  };

  const handleFileInput = (e) => {
    handleFileSelection(e.target.files[0]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Educational Document Verification System
          </h1>
          <p className="text-xl text-gray-600">
            Upload your educational documents for instant verification
          </p>
        </div>

        {/* Document Type Selection */}
        <div className="mb-8">
          <Select onValueChange={setDocumentType} value={documentType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Document Type" />
            </SelectTrigger>
            <SelectContent>
              {documentTypes.map((doc) => (
                <SelectItem key={doc.id} value={doc.id}>
                  <div className="flex items-center space-x-2">
                    {doc.icon}
                    <span>{doc.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Document Type Info */}
        {documentType && (
          <div className="mb-8 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2">
              {documentTypes.find(d => d.id === documentType)?.icon}
              <h3 className="text-lg font-medium text-blue-900">
                {documentTypes.find(d => d.id === documentType)?.name}
              </h3>
            </div>
            <p className="mt-2 text-sm text-blue-700">
              {documentTypes.find(d => d.id === documentType)?.description}
            </p>
            <p className="mt-1 text-sm text-blue-600">
              Accepted formats: {documentTypes.find(d => d.id === documentType)?.acceptedFormats}
            </p>
          </div>
        )}

        {/* Upload Area */}
        <div
          className={`relative border-2 border-dashed rounded-lg p-12 text-center ${
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 bg-white'
          } transition-all duration-200 ease-in-out`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="space-y-6">
            <div className="flex justify-center">
              <Upload
                className={`w-16 h-16 ${
                  isDragging ? 'text-blue-500' : 'text-gray-400'
                }`}
              />
            </div>
            <div className="text-lg">
              <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                <span>Upload a file</span>
                <input
                  type="file"
                  className="sr-only"
                  accept="image/*,.pdf"
                  onChange={handleFileInput}
                  disabled={!documentType}
                />
              </label>
              <span className="text-gray-500"> or drag and drop</span>
            </div>
            <p className="text-sm text-gray-500">
              {documentType ? 
                `Upload your ${documentTypes.find(d => d.id === documentType)?.name}` :
                'Please select a document type first'}
            </p>
          </div>
        </div>

        {/* Status Messages */}
        {status === 'success' && file && (
          <Alert className="mt-4 bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800 ml-2">
              File selected: {file.name}
            </AlertDescription>
          </Alert>
        )}

        {status === 'error' && (
          <Alert className="mt-4 bg-red-50 border-red-200">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800 ml-2">
              Please upload a PDF or image file.
            </AlertDescription>
          </Alert>
        )}

        {/* Upload Button */}
        {file && documentType && (
          <div className="mt-6">
            <button
              className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => {
                console.log('Uploading file:', file, 'Type:', documentType);
              }}
            >
              <FileText className="w-5 h-5 mr-2" />
              Verify {documentTypes.find(d => d.id === documentType)?.name}
            </button>
          </div>
        )}

        {/* Document Requirements */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Document Requirements</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {documentTypes.map((doc) => (
              <div key={doc.id} className="relative rounded-lg border border-gray-200 bg-white p-6">
                <div className="flex items-center space-x-2 mb-4">
                  {doc.icon}
                  <h3 className="text-lg font-medium text-gray-900">{doc.name}</h3>
                </div>
                <p className="text-sm text-gray-500 mb-2">{doc.description}</p>
                <p className="text-xs text-gray-400">Accepted: {doc.acceptedFormats}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Verification Features</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="p-6 bg-white rounded-lg border border-gray-200">
              <CheckCircle2 className="w-8 h-8 text-green-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Real-time Verification</h3>
              <p className="text-gray-500">Instant document authenticity check using AI</p>
            </div>
            <div className="p-6 bg-white rounded-lg border border-gray-200">
              <AlertCircle className="w-8 h-8 text-blue-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Secure Processing</h3>
              <p className="text-gray-500">End-to-end encryption for document security</p>
            </div>
            <div className="p-6 bg-white rounded-lg border border-gray-200">
              <ScrollText className="w-8 h-8 text-purple-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Format Support</h3>
              <p className="text-gray-500">Support for PDF and image formats</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;