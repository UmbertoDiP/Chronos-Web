import os
import pickle
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

CLIENT_SECRETS_FILE = r"C:\Users\umber\Downloads\client_secret_301677249237-9k11hk8nl9173o34t0b1stbet91pbgqo.apps.googleusercontent.com.json"
SCOPES = ['https://www.googleapis.com/auth/webmasters.readonly']

def get_service():
    creds = None
    token_file = 'token.pickle'

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

def list_sites():
    service = get_service()

    try:
        sites = service.sites().list().execute()

        print("\n" + "="*80)
        print("AVAILABLE SITES IN SEARCH CONSOLE")
        print("="*80)

        if 'siteEntry' in sites:
            for site in sites['siteEntry']:
                site_url = site['siteUrl']
                permission = site.get('permissionLevel', 'N/A')
                print(f"URL: {site_url}")
                print(f"Permission: {permission}")
                print("-" * 80)
        else:
            print("[INFO] No sites found")

    except Exception as e:
        print(f"[ERROR] Failed to list sites: {e}")

if __name__ == '__main__':
    list_sites()
