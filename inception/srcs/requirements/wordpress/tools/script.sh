#!/bin/sh

cp /tmp/www.conf /etc/php/7.3/fpm/pool.d/www.conf

if [ ! -f /var/www/wordpress/wp-config.php ]; then
	cd /var/www/wordpress && \
	wp core download --allow-root

	# Download wordpress package && setup Config file
	rm -fr wp-config-sample.php && \
	cp /tmp/wp-config.php /var/www/wordpress/wp-config.php && \
	sed -i "s/database_name_here/$WP_DB_NAME/g" /var/www/wordpress/wp-config.php && \
	sed -i "s/username_here/$WP_DB_USER/g" /var/www/wordpress/wp-config.php && \
	sed -i "s/password_here/$WP_DB_PASSWORD/g" /var/www/wordpress/wp-config.php && \
	sed -i "s/localhost/$WP_DB_HOST/g" /var/www/wordpress/wp-config.php && \
	chown -R www-data:www-data /var/www/wordpress && \
	chmod -R 775 /var/www/wordpress

	# setup wordpress
	wp core install --allow-root --url=$WP_URL --title=$WP_TITLE \
		--admin_user=$WP_ADMIN_USER --admin_password=$WP_ADMIN_PASSWORD --admin_email=$WP_ADMIN_EMAIL
	wp user create --allow-root $WP_USER_LOGIN $WP_USER_EMAIL --user_pass=$WP_USER_PASSWORD --role=author

	# Redis cache
	wp plugin install redis-cache --activate --allow-root
	wp plugin update --all --allow-root
	wp redis enable --allow-root
fi

/usr/sbin/php-fpm7.3 -F