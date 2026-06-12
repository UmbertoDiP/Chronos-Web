#!/bin/bash
cd dist
FTP_HOST="ftp.umbertodipuorto.it"
FTP_USER="ceetntjm"
FTP_PASS="0eY0XJYYXTpoj7*i"
REMOTE_DIR="/public_html"

# Path immagini esperienze esterne a Lovable (desktop backup)
# NOTA: Queste immagini sono mantenute fuori dal progetto Lovable per evitare
# sovrascritture durante sync/rebuild. Verranno migrate quando il dominio
# passerà da Netsons FTP a Cloudflare Pages.
EXTERNAL_IMAGES_PATH="C:\Users\umber\Desktop\BACKUP_EXPERIENCE_IMAGES_2025-01-17"

echo "Uploading all files to $FTP_HOST$REMOTE_DIR..."

# Upload all files from dist recursively
find . -type f | while read file; do
    dir=$(dirname "$file")
    if [ "$dir" != "." ]; then
        curl --ftp-create-dirs -T "$file" "ftp://$FTP_HOST$REMOTE_DIR/$file" --user "$FTP_USER:$FTP_PASS" 2>&1 | grep -v "Warning\|  %\|Dload"
    else
        curl -T "$file" "ftp://$FTP_HOST$REMOTE_DIR/$file" --user "$FTP_USER:$FTP_PASS" 2>&1 | grep -v "Warning\|  %\|Dload"
    fi
    echo "✓ $file"
done

# Upload external experience images (maintained outside Lovable project)
echo ""
echo "Uploading external experience images from desktop backup..."
cd "$EXTERNAL_IMAGES_PATH"
for img in *.jpg *.png; do
    if [ -f "$img" ]; then
        curl --ftp-create-dirs -T "$img" "ftp://$FTP_HOST$REMOTE_DIR/assets/images/experiences/$img" --user "$FTP_USER:$FTP_PASS" 2>&1 | grep -v "Warning\|  %\|Dload"
        echo "✓ External image: $img"
    fi
done

echo ""
echo "Upload completed!"
echo ""
echo "📸 Experience images: Uploaded from external backup (Desktop)"
echo "📂 Path: $EXTERNAL_IMAGES_PATH"
echo "🌐 Production URL: https://www.umbertodipuorto.it/assets/images/experiences/"
echo ""
echo "⚠️  NOTE: Images are kept external to Lovable project."
echo "    When migrating to Cloudflare Pages, move images to public/assets/images/experiences/"
