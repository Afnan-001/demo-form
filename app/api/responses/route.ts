import { NextResponse } from 'next/server';
import getDb from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Basic validation
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const db = await getDb(); // default DB name 'Responses'
    const col = db.collection('responses');
    const result = await col.insertOne({ ...body, createdAt: new Date() });

    return NextResponse.json({ insertedId: result.insertedId }, { status: 201 });
  } catch (err) {
    console.error('Error saving response:', err);
    return NextResponse.json({ error: (err as Error).message || String(err) }, { status: 500 });
  }
}

export async function GET() {
  try {
    const db = await getDb();
    const col = db.collection('responses');
    const docs = await col.find().sort({ createdAt: -1 }).limit(100).toArray();
    return NextResponse.json(docs);
  } catch (err) {
    console.error('Error fetching responses:', err);
    return NextResponse.json({ error: (err as Error).message || String(err) }, { status: 500 });
  }
}
