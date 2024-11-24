

cd /app
composer install --no-interaction --optimize-autoloader
npm i
npm run build
php artisan storage:link
php artisan migrate --force

chmod 777 -R storage/
chmod 777 -R storage/logs/
chmod 777 -R bootstrap/

chmod +x /usr/local/bin/entrypoint.sh
/usr/bin/supervisord -c /etc/supervisord.conf
