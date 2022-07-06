import { useMoralisQuery, useNewMoralisObject } from "react-moralis";
import { useMoralis } from "react-moralis";
import { Moralis } from "moralis";
import { useState } from "react";
import { useParams } from 'react-router-dom';


export default function Landing() {
    let { urlSlug } = useParams();

    var currentUser:any = Moralis.User.current();
    var userAddr = currentUser.get("ethAddress");
    const [userSlug, setUserSlug] = useState('');
    const [instanceSlug, setInstanceSlug]:any = useState();

    //Fetch myself
    const { fetch } = useMoralisQuery(
        "Slugs",
        (query) => query.equalTo("owner", userAddr),
        [],
        { autoFetch: false }
    );

    const basicQuery = async () =>{
        const results:any = await fetch();
        if(!(results?.length == 0)){
            setUserSlug(results[0].get("slug"))
            setInstanceSlug(results[0])
        }
        return results
    }

    const checkDupes = async () => {
        await basicQuery().then((result) => {
        if(result?.length == 0){
            saveObject()
        }})
    }


    //SAVE LOGIC
    const {save} = useNewMoralisObject("Slugs");
    const saveObject = async () => {
            const data = {
                owner: userAddr,
                slug: userSlug
            };
    
            save(data, {
                onSuccess: (slug) => {
                    alert("New Object created id: "+slug.id)
                },
                onError: (error) => {
                    alert("Failed to creaaate new object, err code: "+error.message);
                }
            });
    }
    
    //UPDATE LOGIC
    const updateObject = async () => {
        instanceSlug.set("slug", userSlug);
        instanceSlug.save();
    };
    

    return (
        <div>
            <h1>ProfileLanding</h1>
            <p>{userAddr}</p>

            <label>Slug: </label>
            <input id="fslug" type="text" value={userSlug} onChange={e => setUserSlug(e.target.value)}/>
            <br/>
            <br/>
            <button onClick={basicQuery}>Check if addr got slug</button>
            <button onClick={checkDupes}>Create test Slug for addr</button>
            <button onClick={updateObject}>Update current slug</button>
        </div>
    );
}