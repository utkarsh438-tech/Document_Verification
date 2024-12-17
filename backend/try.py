import easyocr
import cv2
from difflib import SequenceMatcher

# Function to preprocess the image (grayscale + contrast enhancement)
def preprocess_image(image_path):
    # Load the image
    image = cv2.imread(image_path)

    # Convert the image to grayscale
    grayscale_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Apply contrast enhancement (using histogram equalization)
    enhanced_image = cv2.equalizeHist(grayscale_image)

    # Save the processed image (optional)
    processed_image_path = "processed_image.png"
    cv2.imwrite(processed_image_path, enhanced_image)

    return processed_image_path

# Function to extract text from an image using EasyOCR
def extract_text(image_path):
    reader = easyocr.Reader(['en'], gpu=True)  # Use GPU for faster processing if available
    results = reader.readtext(image_path, detail=0)  # Extract text without bounding box details
    extracted_text = " ".join(results)  # Combine the detected text
    return extracted_text

# Function to compare two texts using SequenceMatcher
def text_similarity(text1, text2):
    return SequenceMatcher(None, text1, text2).ratio()

# Paths to the real document and test document
real_doc_path = "org.png"  # Path to the real document image
test_doc_path = "vk.jpg"   # Path to the test document image

# Preprocess images (grayscale + contrast enhancement)
processed_real_doc_path = preprocess_image(real_doc_path)
processed_test_doc_path = preprocess_image(test_doc_path)

# Extract text directly from both images
real_text = extract_text(processed_real_doc_path)
test_text = extract_text(processed_test_doc_path)

# Compare the extracted texts
similarity_score = text_similarity(real_text, test_text) * 100  # Convert to percentage

# Print results
print(f"Extracted Text from Real Document:\n{real_text}\n")
print(f"Extracted Text from Test Document:\n{test_text}\n")
print(f"Similarity Score: {similarity_score:.2f}%")  # Display similarity as percentage

# Verify authenticity
if similarity_score > 70:
    print("The document is authentic (high similarity).")
else:
    print("The document may not be authentic (low similarity).")
