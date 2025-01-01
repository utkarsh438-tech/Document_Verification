import easyocr
import cv2
from difflib import SequenceMatcher
import numpy as np

# Function to extract text from an image using EasyOCR, with preprocessing included
def extract_text(image_path):
    image = cv2.imread(image_path)
    if image is None:
        raise FileNotFoundError(f"Image not found or cannot be loaded: {image_path}")
    
    grayscale_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    enhanced_image = cv2.equalizeHist(grayscale_image)
    
    reader = easyocr.Reader(['en'], gpu=True)
    results = reader.readtext(enhanced_image, detail=0)
    extracted_text = " ".join(results)
    
    return extracted_text

# Function to compare two texts using SequenceMatcher
def text_similarity(text1, text2):
    return SequenceMatcher(None, text1, text2).ratio()

# Check for document format (image dimensions, resolution, and extension)
def check_document_format(image_path):
    image = cv2.imread(image_path)
    if image is None:
        return 0  # Invalid image format or file
    
    # Check image resolution
    height, width = image.shape[:2]
    if height < 600 or width < 600:
        return 0  # Invalid resolution, might be too low quality
    
    return 1  # Valid document format

# Function to verify table structure by analyzing the alignment of text blocks
def verify_table_structure(extracted_text):
    # Here you could use a predefined table structure (e.g., regex, specific row/column checks)
    # For simplicity, we'll check if the text has specific keywords (like "Name", "Date", etc.)
    keywords = ['Name', 'Date', 'Signature']
    score = 0
    for keyword in keywords:
        if keyword.lower() in extracted_text.lower():
            score += 1
    return score / len(keywords)  # Return a score between 0 and 1

# Function to check for a signature in the document
def verify_signature(image_path):
    image = cv2.imread(image_path)
    if image is None:
        return 0  # Invalid image
    
    # You can define a region of interest (ROI) for signature detection
    height, width = image.shape[:2]
    roi = image[height-100:height, width-200:width]
    
    # Using edge detection to check for signature-like patterns (simplified)
    gray_roi = cv2.cvtColor(roi, cv2.COLOR_BGR2GRAY)
    edges = cv2.Canny(gray_roi, 100, 200)
    
    # If edges are found, assume signature is present
    if np.sum(edges) > 500:  # This threshold can be adjusted
        return 1  # Signature detected
    return 0  # No signature detected

# Paths to the real document and test document
real_doc_path = r"C:\Users\utkar\MIINI\Document_Verification\backend\org.png"
test_doc_path = r"C:\Users\utkar\MIINI\Document_Verification\backend\fake.jpg"

# Extract text from both images
real_text = extract_text(real_doc_path)
test_text = extract_text(test_doc_path)

# Compare the extracted texts
similarity_score = text_similarity(real_text, test_text) * 100

# Document format verification
format_score = check_document_format(test_doc_path)

# Verify table structure
structure_score = verify_table_structure(test_text)

# Verify signature presence
signature_score = verify_signature(test_doc_path)

# Print results
print(f"Extracted Text from Real Document:\n{real_text}\n")
print(f"Extracted Text from Test Document:\n{test_text}\n")
print(f"Similarity Score: {similarity_score:.2f}%\n")

print(f"Document Format Score: {format_score}")
print(f"Table Structure Score: {structure_score:.2f}")
print(f"Signature Score: {signature_score}")

# Final authenticity check with a combined score
final_score = (similarity_score * 0.4 + format_score * 0.2 + structure_score * 0.2 + signature_score * 0.2)
print(f"Final Authenticity Score: {final_score:.2f}")

if final_score >2:
    print("The document is authentic (high overall score).")
else:
    print("The document may not be authentic (low overall score).")
