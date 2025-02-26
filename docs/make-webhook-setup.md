# Make.com Webhook Integration Guide

This guide explains how to set up a webhook in Make.com (formerly Integromat) to receive form submissions from your Next.js website.

## Setting Up the Webhook in Make.com

1. **Create a Make.com Account**
   - If you don't have one already, sign up at [make.com](https://www.make.com/)

2. **Create a New Scenario**
   - Click on "Create a new scenario"
   - Choose "Webhooks" as your trigger module
   - Select "Custom webhook"

3. **Set Up the Webhook**
   - Choose "Instant trigger (3.0)" for real-time processing
   - Click "Add" to create the webhook
   - Make.com will generate a unique webhook URL like `https://hook.eu1.make.com/abc123xyz456`
   - Save this URL - you'll need to add it to your Next.js application's environment variables

4. **Configure Data Structure**
   - Click on "Determine data structure"
   - Choose "Example of expected data"
   - Paste the following JSON sample (this matches what your application will send):

```json
{
  "customer": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "123456789"
  },
  "ttb": "SINGLE_PACK",
  "serviceIds": ["PACK001"],
  "contractDescription": "Pack Single 300 Mbps + 1 Línea Móvil 50GB",
  "totalPrice": 28,
  "id": "single",
  "title": "Pack Single",
  "serviceType": "pack"
}
```

5. **Add Processing Steps**
   - Add additional modules to process the data as needed:
     - Connect to your CRM (Salesforce, HubSpot, etc.)
     - Send email notifications
     - Store data in a Google Sheet
     - Create tasks in project management tools
     - etc.

6. **Activate the Scenario**
   - Toggle the scenario on to start receiving webhook data
   - Test it by submitting a form on your website

## Updating Your Next.js Application

1. **Add the Webhook URL to Your Environment**
   - Open your `.env.local` file
   - Update the `MAKE_WEBHOOK_URL` variable with your actual webhook URL:
   ```
   MAKE_WEBHOOK_URL=https://hook.eu1.make.com/your-unique-webhook-id
   ```

2. **Restart Your Development Server**
   - Restart your Next.js development server to apply the changes

## Troubleshooting

- **Check Logs**: If submissions aren't reaching Make.com, check your browser console and server logs
- **Webhook URL**: Verify the webhook URL is correctly set in your environment variables
- **Make.com Scenario**: Ensure your Make.com scenario is activated and properly configured
- **Network Issues**: Check for CORS or network connectivity issues

## Data Format

The form submission sends the following data in JSON format:

- `customer`: Customer information (name, email, phone)
- `serviceType`: Type of service (pack, fibra, movil, fibra-movil, bono-minutes, bono-data)
- `id`: Unique identifier for the selected plan
- `title`: Title of the selected plan
- `totalPrice`: Total price of the selected plan
- `ttb`: Tarifario TTB code
- `serviceIds`: Array of service identifiers
- `contractDescription`: Description of the contract
- `additionalLines`: Array of additional mobile lines (if applicable) 