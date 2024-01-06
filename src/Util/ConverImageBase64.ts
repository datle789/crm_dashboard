export function getBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file) return reject('File is null or undefined')

    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
}