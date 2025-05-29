<?php
function corrupted_memory_theme_setup() {
    // Register navigation menus if needed
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'corrupted-memory'),
    ));
    
    // Add theme support
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    
    // Remove unnecessary features
    remove_theme_support('widgets-block-editor');
    remove_theme_support('block-templates');
}
add_action('after_setup_theme', 'corrupted_memory_theme_setup');

function corrupted_memory_scripts() {
    // Main stylesheet
    wp_enqueue_style(
        'corrupted-memory-style',
        get_stylesheet_directory_uri() . '/stylesheet.css',
        array(),
        filemtime(get_stylesheet_directory() . '/stylesheet.css')
    );
    
    // JavaScript files
    wp_enqueue_script(
        'corrupted-memory-loader',
        get_stylesheet_directory_uri() . '/js/loader.js',
        array(),
        filemtime(get_stylesheet_directory() . '/js/loader.js'),
        true
    );
    
    wp_enqueue_script(
        'corrupted-memory-cart',
        get_stylesheet_directory_uri() . '/js/shoppingCart.js',
        array('corrupted-memory-loader'),
        filemtime(get_stylesheet_directory() . '/js/shoppingCart.js'),
        true
    );
}
add_action('wp_enqueue_scripts', 'corrupted_memory_scripts');

// Remove unnecessary WordPress head elements
function remove_wp_head_elements() {
    remove_action('wp_head', 'wp_generator');
    remove_action('wp_head', 'rsd_link');
    remove_action('wp_head', 'wlwmanifest_link');
    remove_action('wp_head', 'wp_shortlink_wp_head');
    remove_action('wp_head', 'feed_links', 2);
    remove_action('wp_head', 'feed_links_extra', 3);
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('wp_print_styles', 'print_emoji_styles');
    remove_action('wp_head', 'rest_output_link_wp_head');
    remove_action('wp_head', 'wp_oembed_add_discovery_links');
    remove_action('wp_head', 'wp_resource_hints', 2);
    remove_action('wp_head', 'wp_site_icon', 99);
}
add_action('init', 'remove_wp_head_elements');
