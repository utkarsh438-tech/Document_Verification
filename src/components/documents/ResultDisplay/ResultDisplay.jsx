import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getVerificationResult } from '../../../services/api/documentApi'

const ResultDisplay = () => {
  const { id } = useParams()
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const data = await getVerificationResult(id)
        setResult(data)
      } catch (err) {
        setError('Error fetching verification results')
      } finally {
        setLoading(false)
      }
    }

    fetchResult()
  }, [id])

  if (loading) return <div>Loading results...</div>
  if (error) return <div className="text-red-600">{error}</div>

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Verification Results</h2>
      
      {result && (
        <div className="space-y-4">
          <DocumentResult
            title="Class 10 Marksheet"
            result={result.class10Result}
          />
          <DocumentResult
            title="Class 12 Marksheet"
            result={result.class12Result}
          />
          <DocumentResult
            title="JEE Result"
            result={result.jeeResult}
          />
          
          <div className="mt-6 p-4 bg-gray-50 rounded">
            <h3 className="font-bold">Overall Verification Status:</h3>
            <p className={`mt-2 ${
              result.overallStatus === 'verified' 
                ? 'text-green-600' 
                : 'text-red-600'
            }`}>
              {result.overallStatus === 'verified' 
                ? 'All documents verified successfully' 
                : 'Some documents require attention'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

const DocumentResult = ({ title, result }) => (
  <div className="border-b pb-4">
    <h3 className="font-bold">{title}</h3>
    <div className="mt-2">
      <span className={`inline-block px-2 py-1 rounded ${
        result.verified 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }`}>
        {result.verified ? 'Verified' : 'Verification Failed'}
      </span>
      {!result.verified && (
        <p className="mt-2 text-sm text-red-600">{result.message}</p>
      )}
    </div>
  </div>
)

export default ResultDisplay