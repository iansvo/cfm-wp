<?php

if(! class_exists('Employees') )
{
    class Employees 
    {
 
	    CONST POST_TYPE        = 'Employee';
	    CONST POST_TYPE_PLURAL = 'Employees';
	    CONST NONCE_ACTION     = self::POST_TYPE . '-form';
	    CONST NONCE_NAME       = self::POST_TYPE . '-form-nonce'; 
	 
	    public $parent_community = 0;
	 
	    function __construct() 
	    {
	        add_action( 'init', array($this, 'cpt_init') );
	    }


	    public function cpt_init()
	    {
			$singular = self::POST_TYPE;
			$plural   = self::POST_TYPE_PLURAL;

			$labels = array(
				'name'               => $plural,
				'singular_name'      => $singular,
				'add_new'            => 'Add New',
				'add_new_item'       => 'Add'     . ' ' .  $singular,
				'edit_item'          => 'Edit'    . ' ' .  $singular,
				'new_item'           => 'New'     . ' ' .  $singular,
				'all_items'          => 'All'     . ' ' .  $plural,
				'view_item'          => 'View'    . ' ' .  $singular,
				'search_items'       => 'Search'  . ' ' .  $plural,
				'not_found'          => sprintf('No %s found',          $plural),
				'not_found_in_trash' => sprintf('No %s found in trash', $plural),
				'parent_item_colon'  => '',
				'menu_name'          => $plural,
				'menu_icon'          => '',
			);
	        $args = array(
	            'labels'             => $labels,
	            'public'             => true,
	            'publicly_queryable' => true,
	            'show_ui'            => true,
	            'show_in_menu'       => true,
	            'query_var'          => true,
	            'capability_type'    => 'post',
	            'has_archive'        => true,
	            'hierarchical'       => false,
	            'menu_position'      => null,
	            'supports'           => array( 'title', 'page-attributes', 'editor' )
	        );
	        register_post_type(strtolower(self::POST_TYPE), $args);
	    }
 
    }

    new Employees();
 
}