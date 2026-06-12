#!/bin/bash

# FTP Upload Script for Folder2Text.com
# Temporary deployment to Netsons FTP while awaiting DNS migration to Cloudflare Pages

cd dist

# FTP Configuration - Netsons
FTP_HOST="ftp.folder2text.com"
FTP_USER="YOUR_FTP_USERNAME"
FTP_PASS="YOUR_FTP_PASSWORD"
REMOTE_DIR="/public_html"

echo "Uploading all files to $FTP_HOST$REMOTE_DIR..."

# Upload all dist files
find . -type f | while read file; do
    if [ -f "$file" ]; then
        curl --ftp-create-dirs -T "$file" "ftp://$FTP_HOST$REMOTE_DIR/$file" --user "$FTP_USER:$FTP_PASS" 2>&1 | grep -v "Warning\|  %\|Dload"
    fi
    echo "✓ $file"
done

echo ""
echo "Upload completed!"
