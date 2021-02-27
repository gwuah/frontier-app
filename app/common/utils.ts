import https from "https"
import fs from "fs"

export const getFileExtension = (fileUrl: string): string => {
  const values = fileUrl.split('.')
  return values.pop() as string
}

export const generateFileName = (fileUrl: string): string => {
  return `${process.cwd()}/assets/resume_${Date.now()}.${getFileExtension(fileUrl)}`
}

export const downloadFile = (fileUrl: string, destination: string) => new Promise((resolve, reject) => {
  const file = fs.createWriteStream(destination);
  https.get(fileUrl, function (response) {
    response.pipe(file);
    file.on('finish', function (): void {
      file.close();
      resolve(destination)
    });
  }).on('error', reject);
})