export async function multipartParser(event) {
  const multipartMap = new Map()
  const files = [];
  const formData = await readMultipartFormData(event)

  if (!formData) return Object.fromEntries(multipartMap)

  formData.forEach((row) => {
    if (row.filename && row.type) {
      files.push(row)
    } else {
      const { data } = row
      const dataStr = Buffer.from(data).toString()
      multipartMap.set(row.name, dataStr)
    }
  })

  event.files = files;

  return Object.fromEntries(multipartMap)
}
