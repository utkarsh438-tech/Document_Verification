const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const uploadDocument = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/documents/verify`, {
      method: 'POST',
      body: formData,
    })
    
    if (!response.ok) {
      throw new Error('Upload failed')
    }
    
    return await response.json()
  } catch (error) {
    throw new Error('Error uploading documents')
  }
}

export const getVerificationResult = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/documents/result/${id}`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch results')
    }
    
    return await response.json()
  } catch (error) {
    throw new Error('Error fetching verification results')
  }
}