import { NextRequest, NextResponse } from 'next/server';

// Make.com webhook URL - Replace this with your actual webhook URL from Make.com
const MAKE_WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL || 'https://hook.eu1.make.com/your-unique-webhook-id';

export async function POST(request: NextRequest) {
  try {
    // Parse the form data from the request
    const formData = await request.json();
    
    // Log the data being sent to Make.com (remove in production)
    console.log('Sending data to Make.com:', formData);
    
    // Send the data to Make.com webhook
    const response = await fetch(MAKE_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    // Check if the request to Make.com was successful
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error from Make.com webhook:', errorText);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Failed to process the form submission' 
        },
        { status: 500 }
      );
    }
    
    // Return a success response
    return NextResponse.json({ 
      success: true, 
      message: 'Form submitted successfully' 
    });
    
  } catch (error) {
    // Log the error (make sure to handle this properly in production)
    console.error('Error processing form submission:', error);
    
    // Return an error response
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error processing your request' 
      },
      { status: 500 }
    );
  }
} 