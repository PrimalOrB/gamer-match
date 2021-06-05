async function newFormHandler( event ){
    event.preventDefault();

    const content = document.querySelector( 'textarea[name="comment-content"]').value;

    const gameId = window.location.toString().split( '/' ) [
        window.location.toString().split( '/' ).length - 1
    ];

    const response = await fetch( '/api/comments' , {
        method: 'POST',
        body: JSON.stringify( {
            content,
            game_id: gameId,
            // user_id:
        } ),
        headers: {
            'Content-Type': 'application/json'
        }
    } );

    if( response.ok ) {
        document.location.replace( '/dashboard' );
    } else {
        alert( response.statusText )
    }
}

document.querySelector( '.new-post-form' ).addEventListener( 'submit', newFormHandler );
