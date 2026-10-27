import { QuoteRequest, Order } from '../types';

export function generateProformaHTML(quote: QuoteRequest): string {
  const dateStr = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const totalQty = quote.items.reduce((sum, item) => sum + item.totalQuantity, 0);
  const totalAmount = quote.grandTotal || quote.subtotal || 0;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Proforma Invoice ${quote.id} - COVENT & STONE</title>
  <style>
    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      color: #1c1917;
      margin: 0;
      padding: 40px;
      background: #ffffff;
      font-size: 13px;
      line-height: 1.5;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #292524;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .logo {
      font-family: Georgia, serif;
      font-size: 24px;
      font-weight: bold;
      letter-spacing: 2px;
      color: #292524;
    }
    .subtitle {
      font-size: 11px;
      color: #78716c;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-top: 4px;
    }
    .doc-title {
      text-align: right;
    }
    .doc-title h1 {
      margin: 0;
      font-size: 20px;
      color: #854d0e;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .doc-title p {
      margin: 4px 0 0;
      color: #78716c;
      font-family: monospace;
    }
    .grid {
      display: flex;
      justify-content: space-between;
      gap: 30px;
      margin-bottom: 30px;
    }
    .box {
      flex: 1;
      background: #fafaf9;
      border: 1px solid #e7e5e4;
      border-radius: 8px;
      padding: 16px;
    }
    .box-title {
      font-size: 11px;
      font-weight: bold;
      text-transform: uppercase;
      color: #854d0e;
      margin-bottom: 8px;
      letter-spacing: 1px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 30px;
    }
    th {
      background: #292524;
      color: #ffffff;
      text-align: left;
      padding: 10px 12px;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    td {
      padding: 12px;
      border-bottom: 1px solid #e7e5e4;
    }
    .text-right {
      text-align: right;
    }
    .totals {
      width: 320px;
      margin-left: auto;
      margin-bottom: 30px;
    }
    .totals-row {
      display: flex;
      justify-content: space-between;
      padding: 6px 0;
      border-bottom: 1px solid #f5f5f4;
    }
    .totals-row.grand {
      font-size: 16px;
      font-weight: bold;
      color: #854d0e;
      border-top: 2px solid #292524;
      border-bottom: 2px solid #292524;
      padding: 10px 0;
      margin-top: 6px;
    }
    .bank-details {
      background: #fefce8;
      border: 1px solid #fef08a;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 30px;
    }
    .footer {
      text-align: center;
      font-size: 11px;
      color: #a8a29e;
      border-top: 1px solid #e7e5e4;
      padding-top: 20px;
    }
    @media print {
      body { padding: 0; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div className="no-print" style="text-align: right; margin-bottom: 20px;">
    <button onclick="window.print()" style="background: #854d0e; color: white; border: none; padding: 10px 20px; border-radius: 6px; font-weight: bold; cursor: pointer;">
      Print / Download PDF
    </button>
  </div>

  <div class="header">
    <div>
      <div class="logo">COVENT & STONE</div>
      <div class="subtitle">Heritage Footwear & Wholesale Artisans</div>
      <div style="font-size: 11px; color: #57534e; margin-top: 6px;">
        74 Mercer Street, Suite 4B, SoHo, New York, NY 10012<br />
        Tax ID: US-914401928 · VAT: GB921448102 · trade@coventstone.com
      </div>
    </div>
    <div class="doc-title">
      <h1>Commercial Proforma</h1>
      <p>Ref: ${quote.id}</p>
      <p>Date: ${dateStr}</p>
      <p>Valid Until: ${quote.validUntil || '30 Days'}</p>
    </div>
  </div>

  <div class="grid">
    <div class="box">
      <div class="box-title">Billed To (Wholesale Buyer)</div>
      <strong>${quote.companyName}</strong><br />
      Attn: ${quote.contactName}<br />
      Email: ${quote.email}<br />
      Phone: ${quote.phone}<br />
      Country: ${quote.country}
    </div>

    <div class="box">
      <div class="box-title">Shipping & Trade Logistics</div>
      Destination: ${quote.destinationPort || 'Buyer Specified Port'}<br />
      Incoterms: <strong>${quote.incoterms || 'FOB'} (Free On Board)</strong><br />
      Target Delivery: ${quote.targetDeliveryDate || 'Standard 4 Weeks'}<br />
      Preferred Currency: <strong>${quote.preferredCurrency || 'USD'}</strong><br />
      Assigned Trade Rep: ${quote.salesRepAssigned || 'Marcus Vance'}
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>Item & Description</th>
        <th>Color & Material</th>
        <th class="text-right">Pairs Qty</th>
        <th class="text-right">Unit Price</th>
        <th class="text-right">Line Subtotal</th>
      </tr>
    </thead>
    <tbody>
      ${quote.items
        .map(
          (item) => `
        <tr>
          <td>
            <strong>${item.productName}</strong><br />
            <span style="font-size: 11px; color: #78716c; font-family: monospace;">SKU: ${item.sku}</span>
            ${item.customBrandingNote ? `<br/><span style="font-size: 10px; color: #854d0e;">Custom Note: ${item.customBrandingNote}</span>` : ''}
          </td>
          <td>${item.color}</td>
          <td class="text-right">${item.totalQuantity} pairs</td>
          <td class="text-right">$${(item.proposedUnitPrice || item.indicativeUnitPrice).toFixed(2)}</td>
          <td class="text-right"><strong>$${item.lineTotal.toFixed(2)}</strong></td>
        </tr>
      `
        )
        .join('')}
    </tbody>
  </table>

  <div class="totals">
    <div class="totals-row">
      <span>Total Pair Volume:</span>
      <span><strong>${totalQty} pairs</strong></span>
    </div>
    <div class="totals-row">
      <span>Merchandise Subtotal:</span>
      <span>$${(quote.subtotal || totalAmount).toFixed(2)}</span>
    </div>
    <div class="totals-row">
      <span>Est. Freight & Ocean Ins (${quote.incoterms || 'FOB'}):</span>
      <span>$${(quote.estimatedFreight || 0).toFixed(2)}</span>
    </div>
    <div class="totals-row grand">
      <span>Grand Total (${quote.preferredCurrency || 'USD'}):</span>
      <span>$${totalAmount.toFixed(2)}</span>
    </div>
  </div>

  <div class="bank-details">
    <div class="box-title">Official Wire Transfer Routing Details</div>
    <div style="display: flex; gap: 40px; font-size: 12px;">
      <div>
        <strong>Bank Name:</strong> JPMorgan Chase Bank, N.A.<br />
        <strong>Account Name:</strong> Covent & Stone International Trade LLC<br />
        <strong>Account No:</strong> 9928-1102-4491<br />
      </div>
      <div>
        <strong>SWIFT / BIC Code:</strong> CHASUS33XXX<br />
        <strong>FedWire / ABA Routing:</strong> 021000021<br />
        <strong>Payment Reference:</strong> ${quote.id}
      </div>
    </div>
  </div>

  <div class="footer">
    Thank you for choosing Covent & Stone. This Commercial Proforma is subject to standard wholesale terms.<br />
    Issued by Covent & Stone Trade Desk · www.coventstone.com
  </div>
</body>
</html>
  `;
}

export function openProformaPDFWindow(quote: QuoteRequest) {
  const html = generateProformaHTML(quote);
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(html);
    printWindow.document.close();
  }
}
