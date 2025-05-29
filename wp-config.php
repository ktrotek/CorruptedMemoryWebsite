<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'corrupted_memory' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

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
define( 'AUTH_KEY',         '~o6UVSW?I^UrxmA)Du[g8XuU8BN&8.(EAUhb$.|nT6>zWDB$+sg+--6~&;lgW|tc' );
define( 'SECURE_AUTH_KEY',  'lYQ+w*rv7[`Q<m*g]_%t@.S`dl?`S$o.#Ly5>DpN,9!(n42u~hHlpW{MHsIcAG9I' );
define( 'LOGGED_IN_KEY',    'bZS~UrvNpTmBaZ;)fyU.zVR],&vC1o-izb^L+j1h0vh$xpn(ac2f{EUNTJKCuC,L' );
define( 'NONCE_KEY',        'j<vQ?LDA^xq0}(C#bh9-M@QsiR^=)By1}#VuXltnnD-qS^1C^)<PSPn9J@uV>6lj' );
define( 'AUTH_SALT',        'P5R<Fr0:wnR3sk-(mi7/,,m;g>y :r+D:fh~$,!.N$.;#eWK=dz~Q|_s/)s34DJZ' );
define( 'SECURE_AUTH_SALT', 'NMKr@r[;uC-/]{kf7 2`iS8m;K)UMvBbL//}}PtV3=r5Vd3-tds>q7G6qWR:6/^|' );
define( 'LOGGED_IN_SALT',   '02i0kS>N+%6kh+nfdu<_vEu++{+LX~u=tQf{ElA3i#xtB#;I~+3},s*_nM<@qqgI' );
define( 'NONCE_SALT',       'Ssrk[PeSpY4%@jRCKY-=J>G_Jea4fSSvcqs|KLm]!nO64qT_qWd+Zp8SuE@QRbi<' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
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
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
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
