import { useState, useEffect } from 'react';
import { ProfileCards } from './ProfileCards';

export const SearchResults = ({results}) => { 
    
    console.log("results",results)
    //const profiles = results.map(post => <ProfileCards key={post.id} post={post} />)

    //const content = profiles?.length ? profiles : <article><p>No Matching Posts</p></article>
    const content = results?.length ? results : <article><p>No Matching Posts</p></article>
    
    const profiles1 = results.map((profile, index) => <div>{profile}</div>);

    return <>
        {profiles1}
    </>;
};