import os
import pickle
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

def check_url_indexing(service, site_url, inspection_url):
    """Verifica stato indicizzazione URL specifica"""
    request_body = {
        'inspectionUrl': inspection_url,
        'siteUrl': site_url
    }

    try:
        response = service.urlInspection().index().inspect(body=request_body).execute()

        print(f"\n{'='*80}")
        print(f"URL INSPECTION: {inspection_url}")
        print(f"{'='*80}")

        if 'inspectionResult' in response:
            index_result = response['inspectionResult'].get('indexStatusResult', {})

            print(f"Coverage State: {index_result.get('coverageState', 'UNKNOWN')}")
            print(f"Verdict: {index_result.get('verdict', 'N/A')}")
            print(f"Last Crawl: {index_result.get('lastCrawlTime', 'Never')}")
            print(f"Robots.txt State: {index_result.get('robotsTxtState', 'N/A')}")
            print(f"Crawled As: {index_result.get('crawledAs', 'N/A')}")
            print(f"Google Canonical: {index_result.get('googleCanonical', 'N/A')}")
            print(f"User Canonical: {index_result.get('userCanonical', 'N/A')}")
            print(f"Page Fetch State: {index_result.get('pageFetchState', 'N/A')}")
            print(f"Indexing State: {index_result.get('indexingState', 'N/A')}")

            if 'crawlErrorMessage' in index_result:
                print(f"\n[ERROR] Crawl Error: {index_result['crawlErrorMessage']}")

    except Exception as e:
        print(f"[ERROR] Inspection failed: {e}")

if __name__ == '__main__':
    service = get_service()

    # Controlla homepage
    check_url_indexing(service, SITE_URL, 'https://folder2text.com/')

    # Controlla altre URL chiave
    urls_to_check = [
        'https://folder2text.com/privacy',
        'https://folder2text.com/terms'
    ]

    for url in urls_to_check:
        check_url_indexing(service, SITE_URL, url)
