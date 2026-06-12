import os
import pickle
import csv
from datetime import datetime, timedelta
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

# --- CONFIGURAZIONE ---
CLIENT_SECRETS_FILE = r"C:\Users\umber\Downloads\client_secret_301677249237-9k11hk8nl9173o34t0b1stbet91pbgqo.apps.googleusercontent.com.json"
SITE_URL = 'sc-domain:folder2text.com'
SCOPES = ['https://www.googleapis.com/auth/webmasters.readonly']

def get_service():
    creds = None
    token_file = 'token.pickle'

    if os.path.exists(token_file):
        with open(token_file, 'rb') as token:
            creds = pickle.load(token)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            print("[AUTH] Refreshing expired token...")
            creds.refresh(Request())
        else:
            if not os.path.exists(CLIENT_SECRETS_FILE):
                print(f"[ERROR] Credentials file not found: {CLIENT_SECRETS_FILE}")
                return None

            print("[AUTH] Starting OAuth flow...")
            flow = InstalledAppFlow.from_client_secrets_file(CLIENT_SECRETS_FILE, SCOPES)
            creds = flow.run_local_server(port=0)

        with open(token_file, 'wb') as token:
            pickle.dump(creds, token)
        print("[AUTH] Token saved successfully")

    return build('searchconsole', 'v1', credentials=creds)

def fetch_performance(service, site_url, days=7):
    """Query performance ultimi N giorni"""
    end_date = datetime.now().date()
    start_date = end_date - timedelta(days=days)

    request = {
        'startDate': start_date.isoformat(),
        'endDate': end_date.isoformat(),
        'dimensions': ['query'],
        'rowLimit': 25
    }

    try:
        response = service.searchanalytics().query(siteUrl=site_url, body=request).execute()

        print(f"\n{'='*100}")
        print(f"PERFORMANCE REPORT: {site_url}")
        print(f"Period: {start_date} to {end_date} (last {days} days)")
        print(f"{'='*100}")

        if 'rows' in response:
            print(f"{'Keyword':<45} | {'Clicks':>8} | {'Impressions':>12} | {'CTR':>8} | {'Position':>8}")
            print("-" * 100)

            total_clicks = 0
            total_impressions = 0

            for row in response['rows']:
                kw = row['keys'][0]
                clicks = row['clicks']
                imp = row['impressions']
                ctr = row['ctr']
                pos = row['position']

                total_clicks += clicks
                total_impressions += imp

                kw_display = kw if len(kw) <= 45 else kw[:42] + "..."
                print(f"{kw_display:<45} | {clicks:>8} | {imp:>12} | {ctr:>7.2%} | {pos:>8.1f}")

            print("-" * 100)
            print(f"{'TOTAL':<45} | {total_clicks:>8} | {total_impressions:>12}")

            return True
        else:
            print("[INFO] No data found for this period")
            return False

    except Exception as e:
        print(f"[ERROR] API call failed: {e}")
        return False

def performance_by_page(service, site_url, days=7):
    """Performance raggruppate per pagina"""
    end_date = datetime.now().date()
    start_date = end_date - timedelta(days=days)

    request = {
        'startDate': start_date.isoformat(),
        'endDate': end_date.isoformat(),
        'dimensions': ['page'],
        'rowLimit': 25
    }

    try:
        response = service.searchanalytics().query(siteUrl=site_url, body=request).execute()

        print(f"\n{'='*100}")
        print(f"PERFORMANCE BY PAGE: {site_url}")
        print(f"Period: {start_date} to {end_date} (last {days} days)")
        print(f"{'='*100}")

        if 'rows' in response:
            print(f"{'Page':<65} | {'Clicks':>8} | {'Impressions':>12}")
            print("-" * 100)

            for row in response['rows']:
                page = row['keys'][0]
                clicks = row['clicks']
                imp = row['impressions']

                page_display = page if len(page) <= 65 else page[:62] + "..."
                print(f"{page_display:<65} | {clicks:>8} | {imp:>12}")

            return True
        else:
            print("[INFO] No data found for this period")
            return False

    except Exception as e:
        print(f"[ERROR] API call failed: {e}")
        return False

def list_sitemaps(service, site_url):
    """Elenca sitemap e statistiche"""
    try:
        sitemaps = service.sitemaps().list(siteUrl=site_url).execute()

        print(f"\n{'='*100}")
        print(f"SITEMAPS: {site_url}")
        print(f"{'='*100}")

        if 'sitemap' in sitemaps:
            for sm in sitemaps['sitemap']:
                print(f"\nPath: {sm['path']}")
                if 'lastDownloaded' in sm:
                    print(f"  Last Downloaded: {sm['lastDownloaded']}")
                if 'isSitemapsIndex' in sm:
                    print(f"  Is Sitemap Index: {sm['isSitemapsIndex']}")
                if 'contents' in sm:
                    for content in sm['contents']:
                        submitted = content.get('submitted', 0)
                        indexed = content.get('indexed', 0)
                        print(f"  {content['type']}: Submitted={submitted}, Indexed={indexed}")
            return True
        else:
            print("[INFO] No sitemaps found")
            return False

    except Exception as e:
        print(f"[ERROR] Sitemap listing failed: {e}")
        return False

def export_performance_csv(service, site_url, days=7):
    """Esporta performance in CSV"""
    end_date = datetime.now().date()
    start_date = end_date - timedelta(days=days)

    request = {
        'startDate': start_date.isoformat(),
        'endDate': end_date.isoformat(),
        'dimensions': ['query'],
        'rowLimit': 100
    }

    try:
        response = service.searchanalytics().query(siteUrl=site_url, body=request).execute()

        if 'rows' in response:
            filename = f"gsc_performance_{start_date}_{end_date}.csv"

            with open(filename, 'w', newline='', encoding='utf-8') as csvfile:
                fieldnames = ['keyword', 'clicks', 'impressions', 'ctr', 'position']
                writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

                writer.writeheader()
                for row in response['rows']:
                    writer.writerow({
                        'keyword': row['keys'][0],
                        'clicks': row['clicks'],
                        'impressions': row['impressions'],
                        'ctr': row['ctr'],
                        'position': row['position']
                    })

            print(f"\n[SUCCESS] Performance data exported to: {filename}")
            return True
        else:
            print("[INFO] No data to export")
            return False

    except Exception as e:
        print(f"[ERROR] CSV export failed: {e}")
        return False

def run_full_report(service, site_url):
    """Esegue report completo automatico"""
    print("\n" + "="*100)
    print("GOOGLE SEARCH CONSOLE - FULL AUTOMATED REPORT")
    print("="*100)

    # 1. Performance by queries (7 days)
    fetch_performance(service, site_url, days=7)

    # 2. Performance by queries (30 days)
    fetch_performance(service, site_url, days=30)

    # 3. Performance by pages
    performance_by_page(service, site_url, days=7)

    # 4. Sitemaps status
    list_sitemaps(service, site_url)

    # 5. Export CSV
    export_performance_csv(service, site_url, days=30)

    print("\n" + "="*100)
    print("REPORT COMPLETED")
    print("="*100)

if __name__ == '__main__':
    print("[START] Google Search Console CLI Tool")

    service = get_service()
    if not service:
        print("[FATAL] Failed to authenticate")
        exit(1)

    print("[SUCCESS] Authentication completed")

    # Esegue report completo automatico
    run_full_report(service, SITE_URL)
