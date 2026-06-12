import os
import pickle
import time
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

CLIENT_SECRETS_FILE = r"C:\Users\umber\Downloads\client_secret_301677249237-9k11hk8nl9173o34t0b1stbet91pbgqo.apps.googleusercontent.com.json"
SITE_URL = 'sc-domain:folder2text.com'
SCOPES = [
    'https://www.googleapis.com/auth/webmasters.readonly',
    'https://www.googleapis.com/auth/webmasters'
]

def get_service():
    creds = None
    token_file = 'token_full.pickle'

    if os.path.exists(token_file):
        with open(token_file, 'rb') as token:
            creds = pickle.load(token)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(CLIENT_SECRETS_FILE, SCOPES)
            creds = flow.run_local_server(port=0)

        with open(token_file, 'wb') as token:
            pickle.dump(creds, token)

    return build('searchconsole', 'v1', credentials=creds)

def submit_sitemap(service, site_url, sitemap_url):
    """Submit sitemap aggiornata"""
    try:
        service.sitemaps().submit(siteUrl=site_url, feedpath=sitemap_url).execute()
        print(f"[SUCCESS] Sitemap submitted: {sitemap_url}")
        return True
    except Exception as e:
        print(f"[INFO] Sitemap submit: {e}")
        return False

def request_indexing(service, site_url, url):
    """Richiedi indicizzazione URL (via URL Inspection)"""
    try:
        request_body = {
            'inspectionUrl': url,
            'siteUrl': site_url
        }
        response = service.urlInspection().index().inspect(body=request_body).execute()

        index_result = response['inspectionResult'].get('indexStatusResult', {})
        coverage = index_result.get('coverageState', 'UNKNOWN')
        verdict = index_result.get('verdict', 'UNKNOWN')

        print(f"[CHECK] {url}")
        print(f"  Coverage: {coverage}")
        print(f"  Verdict: {verdict}")

        return coverage, verdict
    except Exception as e:
        print(f"[ERROR] {url}: {e}")
        return None, None

def main():
    print("\n" + "="*80)
    print("GOOGLE SEARCH CONSOLE - SUBMIT CHANGES")
    print("="*80)

    service = get_service()

    # 1. Submit sitemap aggiornata
    print("\n[STEP 1] Submitting updated sitemap...")
    sitemap_url = "https://folder2text.com/sitemap.xml"
    submit_sitemap(service, SITE_URL, sitemap_url)

    # 2. Verifica URL critiche modificate
    print("\n[STEP 2] Checking critical URLs...")
    critical_urls = [
        'https://folder2text.com/',
        'https://folder2text.com/privacy',
        'https://folder2text.com/terms'
    ]

    for url in critical_urls:
        coverage, verdict = request_indexing(service, SITE_URL, url)
        time.sleep(1)

    print("\n[STEP 3] Next actions for fast indexing:")
    print("1. Google Search Console > URL Inspection > Request Indexing")
    print("2. Share URL su social (Twitter, LinkedIn) per crawling rapido")
    print("3. Submit sitemap manualmente: https://search.google.com/search-console")
    print("4. Monitoring: Esegui gsc_tool.py ogni 24h per tracking")

    print("\n" + "="*80)
    print("CHANGES SUBMITTED TO GOOGLE")
    print("="*80)
    print("\nExpected timeline:")
    print("- Crawling: 1-3 giorni")
    print("- Indexing: 3-7 giorni")
    print("- Rich snippets: 7-14 giorni")
    print("\nMonitor progress:")
    print("  python gsc_tool.py")
    print("  python gsc_check_indexing.py")

if __name__ == '__main__':
    main()
