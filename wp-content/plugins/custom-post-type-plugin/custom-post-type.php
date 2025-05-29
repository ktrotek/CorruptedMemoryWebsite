<?php
/**
* Plugin Name: Custom Post Type Plugin
* Description: A simple plugin to register a custom post type in WordPress
* License: GPL2
*/
if(!defined('ABSPATH')){
    exit;//Prevent direct access
}

// Function to register the custom post type
function custom_post_type_news(){
    $args = array(
        'labels'        => array(
            'name' => __('Carousel', 'textdomain'),
            'singular_name' => __('Carousel Item', 'textdomain')
        ),
        'public'        => true, 
        'supports'      => array('title', 'editor', 'thumbnail', 'excerpt'),
        'menu_position' => 5,
        'menu_icon'     => 'dashicons-admin-site', 
        'has_archive'   => true,
        'rewrite'       => array('slug' => 'carousel'), 	
        'show_in_rest'  => true,
    );
    register_post_type('carousel',$args); // Recommended lowercase post type name
}
add_action('init', 'custom_post_type_news');