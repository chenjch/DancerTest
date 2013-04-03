package DancerTest;

use Dancer ':syntax';
use Dancer::Plugin::Database;
use Dancer::Plugin::Ajax;

our $VERSION = '0.1';

get '/' => sub {
    session user => 'chenjch';
    
    template 'index';
};

get '/user/:id' => sub {
    my $db = database;
    
    my $user = $db->quick_select('user',{id => param('id')});
    
    return unless $user;
    
    return to_json($user);
};

get '/users' => sub {
    
    template 'index', {};
};

ajax '/users/*/*' => sub {
    my ( $page_index, $page_size ) = splat;
	
    my $db = database;
	
	my ($item_num) = $db->selectrow_array('select count(1) from b2c_merchant where type = 1');

    my $sth = $db->prepare('select * from b2c_merchant where type = 1 order by id limit ?, ?');

    $sth->execute( $page_index * $page_size, $page_size );

    my $rows = $sth->fetchall_arrayref({});
    
    return to_json( { item_num => $item_num, data => $rows } );
};

get '/abc2' => sub {
    my $db = database;
    
    my $user = $db->quick_select('user',{id => 2});
    
    return unless $user;
	
    template 'index', { sss => to_json($user) };
};

get '/logout' => sub {
     session->destroy;
     
     forward '/';
};

true;
