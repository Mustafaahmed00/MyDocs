import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

if (!process.env.GEMINI_API_KEY) {
  throw new Error('Missing GEMINI_API_KEY in .env.local');
}
const apiKey = process.env.GEMINI_API_KEY!; 
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req: Request) {
  try {
    const { text, action } = await req.json();
    
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    let prompt = '';
    switch (action) {
      case 'improve':
        prompt = `Improve this text while maintaining its original meaning and tone: "${text}"`;
        break;
      case 'formal':
        prompt = `Make this text more formal while preserving its meaning: "${text}"`;
        break;
      case 'casual':
        prompt = `Make this text more casual and friendly while keeping its core message: "${text}"`;
        break;
      case 'concise':
        prompt = `Make this text more concise without losing important information: "${text}"`;
        break;
      default:
        prompt = `Improve this text: "${text}"`;
    }

    const result = await model.generateContent(
        prompt.slice(0, 1000) // limit the length to avoid slowing down
      );
    const response = await result.response;

    return NextResponse.json({ 
      suggestion: response.text(),
      originalText: text 
    });
  } catch (error) {
    console.error('AI API error:', error);
    return NextResponse.json(
      { error: 'Failed to get writing suggestions' },
      { status: 500 }
    );
  }
}