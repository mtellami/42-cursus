<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'database_name_here' );

/** Database username */
define( 'DB_USER', 'username_here' );

/** Database password */
define( 'DB_PASSWORD', 'password_here' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

define('WP_REDIS_HOST', 'redis');

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'j]OBp+6Zw/tZ@,xJ6{Y{68I$,Gpj)-^2CnqRJO^oLs3$[ORs1,0rn- 7XuK$`tyM');
define('SECURE_AUTH_KEY',  '@{grby^|2o{%[Ag%l3pN_6d154!I.M1rnn[6s.8Q(/KwFwMMvxIJyx[z=-a<f^]c');
define('LOGGED_IN_KEY',    '[,CiJpu__|QJW<V4=%)tN-|4Zyt+V&RU42#^ZW>{,>39?PR0#m|eRyY8,/Pxd}rH');
define('NONCE_KEY',        'P)fH$K6vfQ<U|L2Ez<x>Nd8#m+h{Sp.>Dxe$)X;3cs_cp4fm=Kq+6q+|C2D|tK3n');
define('AUTH_SALT',        '+p=obQPEE2QI>qFx;<67.6+}9^8DQ&*4#!YDvr&{-0WvMOhtR%zQv}TV:U.ErvrO');
define('SECURE_AUTH_SALT', '(6,DuLm-Eb+DJu%t%VFy9h9./qTixHCIcH-h{P]`HlIspUK7uP $a,&fIl|+&8&$');
define('LOGGED_IN_SALT',   'QmXC!;U?{;.:&yq})z#6cy&,b8 [^`-v|8#OY+P:!LWF)OxRTo)~4:^zMf@Si/Hh');
define('NONCE_SALT',       'Q+#23`xVAS((g&`|sb+5;=GFEDuiP4qDllviP0|Ekww_qBV%1qU=xyKQ:-CY+eww');

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';