import { chunkText } from '@/lib/textchunker'
import { embed } from '@/lib/gemini'
import { getPineconeIndex } from '@/lib/pinecone'
import { extractText } from '@/utils/pdfparser'


export async function POST(req: Request) {
const data = await req.formData()
const file = data.get('file') as File


const text = await extractText(file)
const chunks = chunkText(text)


const vectors = await Promise.all(
chunks.map(async (chunk: string, i: number) => ({
id: `chunk-${i}`,
values: await embed(chunk),
metadata: { text: chunk }
}))
)


const index = getPineconeIndex()
await index.upsert(vectors)


return Response.json({ success: true })
}