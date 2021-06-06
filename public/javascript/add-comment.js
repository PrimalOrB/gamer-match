async function newFormHandler( event ){
    event.preventDefault();

    const content = document.querySelector( 'textarea[name="comment-content"]').value;

    const gameId = window.location.toString().split( '/' ) [
        window.location.toString().split( '/' ).length - 1
    ];

    const userIDCollect = { steamid: document.querySelector( '.welcome-message' ).getAttribute( 'data-user' ) }

    fetch('/api/users/userbyid', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userIDCollect),
    })
    .then((response) => response.json())//
    .then(respUser => {
        const userId = respUser.id

        const postBody = { comment_text: content, game_id: gameId, user_id: userId}

        fetch( '/api/comments' , {
            method: 'POST',
            body: JSON.stringify( postBody ),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                }
        } )
        .then( location.reload() );
    
    } )

}

document.querySelector( '.new-comment-form' ).addEventListener( 'submit', newFormHandler );
