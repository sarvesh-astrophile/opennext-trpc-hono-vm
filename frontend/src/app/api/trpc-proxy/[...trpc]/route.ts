import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3001/trpc';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ trpc: string[] }> }
) {
  try {
    const body = await request.text();
    const url = new URL(request.url);
    const queryString = url.searchParams.toString();
    
    // Await params before accessing its properties
    const resolvedParams = await params;
    
    // Build the procedure path from the dynamic segments
    const procedurePath = resolvedParams.trpc.length > 0 ? `/${resolvedParams.trpc.join('/')}` : '';
    
    // Build the backend URL with the procedure path
    let backendUrl = `${BACKEND_URL}${procedurePath}`;
    if (queryString) {
      backendUrl += `?${queryString}`;
    }
    
    console.log('Proxying POST request to:', backendUrl);
    
    // Forward the request to the backend
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    });

    const data = await response.text();
    
    return new NextResponse(data, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to proxy request' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ trpc: string[] }> }
) {
  try {
    const url = new URL(request.url);
    const queryString = url.searchParams.toString();
    
    // Await params before accessing its properties
    const resolvedParams = await params;
    
    // Build the procedure path from the dynamic segments
    const procedurePath = resolvedParams.trpc.length > 0 ? `/${resolvedParams.trpc.join('/')}` : '';
    
    // Build the backend URL with the procedure path
    let backendUrl = `${BACKEND_URL}${procedurePath}`;
    if (queryString) {
      backendUrl += `?${queryString}`;
    }
    
    console.log('Proxying GET request to:', backendUrl);
    
    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.text();
    
    return new NextResponse(data, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to proxy request' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
