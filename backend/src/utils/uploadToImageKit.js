export const uploadToImageKit = async (file) => {
  try {
    const result = await file.req.imageKit.upload({
      file: file.tempFilePath, // Temporary file path
      fileName: file.name, // Original file name
    });
    return result.url; // Returns the file URL from ImageKit
  } catch (error) {
    console.error('Error uploading to ImageKit:', error);
    throw new Error('Failed to upload file to ImageKit'); // Throw a custom error
  }
};
