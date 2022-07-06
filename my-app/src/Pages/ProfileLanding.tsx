import { useMoralisQuery, useNewMoralisObject } from "react-moralis";
import { useMoralis } from "react-moralis";
import { Moralis } from "moralis";
import { useState } from "react";
import { useParams } from 'react-router-dom';


export default function Landing() {
    let { urlSlug } = useParams();
    const [ownerAddr, setOwnerAddr] = useState('');
    
    //Fetch addr from slug
    const { fetch } = useMoralisQuery(
        "Slugs",
        (query) => query.equalTo("slug", urlSlug),
        [],
        { autoFetch: false }
    );

    const basicQuery = async () =>{
        const results:any = await fetch();
        if(!(results?.length == 0)){
            setOwnerAddr(results[0].get("owner"))
        }
        return results
    }
    

    return (
        <div>
            <h1>ProfileLanding</h1>
            <p>{ownerAddr}</p>
            <button onClick={basicQuery}>fetch</button>
        </div>
    );
}