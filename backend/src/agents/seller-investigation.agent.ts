export class SellerInvestigationAgent {
  static async investigate(url: string) {
    let domain = '';
    try {
      domain = new URL(url).hostname;
    } catch (e) {
      throw new Error('Invalid URL format');
    }

    const evidence: any[] = [];
    
    if (url.startsWith('https://')) {
      evidence.push({
        description: 'Website uses secure HTTPS connection',
        source: 'URL Parsing',
        timestamp: new Date().toISOString(),
        severity: 'LOW',
        confidence: 'HIGH',
        verification_status: 'VERIFIED'
      });
    } else {
      evidence.push({
        description: 'Website does not use HTTPS. Unsecure connection.',
        source: 'URL Parsing',
        timestamp: new Date().toISOString(),
        severity: 'HIGH',
        confidence: 'HIGH',
        verification_status: 'SUSPICIOUS'
      });
    }

    if (domain.includes('shopify') || domain.includes('amazon') || domain.includes('flipkart') || domain.length < 15) {
      evidence.push({
        description: 'Domain appears to be a known marketplace or short, established name.',
        source: 'Domain Heuristics',
        timestamp: new Date().toISOString(),
        severity: 'LOW',
        confidence: 'MEDIUM',
        verification_status: 'INFERRED'
      });
    }

    return {
      domain,
      evidence,
      overall_status: evidence.some(e => e.verification_status === 'SUSPICIOUS') ? 'RISKY' : 'MODERATE'
    };
  }
}