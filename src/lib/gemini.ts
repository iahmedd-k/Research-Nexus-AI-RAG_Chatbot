import { GoogleGenerativeAI } from '@google/generative-ai'


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)


export async function embed(text: string) {
  // Mock embedding: return array of 768 random floats
  return Array.from({ length: 768 }, () => Math.random());
}


export async function askGemini(context: string, question: string) {
const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
const result = await model.generateContent(`Context:\n${context}\n\nQuestion:\n${question}`)
return result.response.text()
}

// gimin