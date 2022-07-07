import { useMoralisQuery, useNewMoralisObject } from "react-moralis";
import { useMoralis } from "react-moralis";
import { Moralis } from "moralis";
import { useState, useEffect, useRef } from "react";

import { Tooltip, Button, Avatar, InputWrapper, TextInput, Grid } from "@mantine/core";
import { Link } from "react-router-dom";
import { At, AlertCircle, DiscountCheck, GitPullRequestDraft } from "tabler-icons-react";
import { storage } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { idText } from "typescript";

export default function Settings() {
  var currentUser: any = Moralis.User.current();
  var userAddr = currentUser.get("ethAddress");
  const [userSlug, setUserSlug] = useState("");
  const [instanceSlug, setInstanceSlug]: any = useState();

  const [selectedHeroFile, setHeroSelectedFile]: any = useState(null);
  const [selectedPfpFile, setPfpSelectedFile]: any = useState(null);
  const [imagePfp, setImagePfp]: any = useState();
  const [imageHero, setImageHero]: any = useState()
  const imageHeroRef = ref(storage, `users/${userAddr}/hero`);
  const imagePfpRef = ref(storage, `users/${userAddr}/pfp`);

  //Fetch myself
  const { fetch } = useMoralisQuery(
    "Slugs",
    (query) => query.equalTo("owner", userAddr),
    [],
    { autoFetch: false }
  );

  useEffect(() => {
    basicQuery();
    listAll(imageHeroRef).then((resp) => {
      resp.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageHero(url);
        });
      });
    });
    listAll(imagePfpRef).then((resp) => {
      resp.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImagePfp(url);
        });
      });
    });
  }, []);

  const basicQuery = async () => {
    const results: any = await fetch();
    if (!(results?.length == 0)) {
      setUserSlug(results[0].get("slug"));
      setInstanceSlug(results[0]);
    }
    return results;
  };

  const checkDupes = async () => {
    await basicQuery().then((result) => {
      if (result?.length == 0) {
        saveObject();
      }
    });
  };

  //SAVE LOGIC
  const { save } = useNewMoralisObject("Slugs");
  const saveObject = async () => {
    const data = {
      owner: userAddr,
      slug: userSlug,
    };

    save(data, {
      onSuccess: (slug) => {
        alert("New Object created id: " + slug.id);
      },
      onError: (error) => {
        alert("Failed to creaaate new object, err code: " + error.message);
      },
    });
  };

  //UPDATE LOGIC
  const updateObject = async () => {
    instanceSlug.set("slug", userSlug);
    instanceSlug.save();
  };

  //FILE UPLOAD SHIT
  const heroFileSlectedHandler = (event: any) => {
    setHeroSelectedFile(event.target.files[0]);
  };

  const HeroFileUploadhandler = () => {
    if (selectedHeroFile == null) return;
    const imgRef = ref(storage, `users/${userAddr}/hero/hero`);
    uploadBytes(imgRef, selectedHeroFile).then(() => {
      //run after upload
      alert("Image uploaded");
    });
  };

  const pfpFileSlectedHandler = (event: any) => {
    setPfpSelectedFile(event.target.files[0]);
  };

  const PfpFileUploadhandler = () => {
    if (selectedPfpFile == null) return;
    const imgRef = ref(storage, `users/${userAddr}/pfp/pfp`);
    uploadBytes(imgRef, selectedPfpFile).then(() => {
      //run after upload
      alert("Image uploaded");
    });
  };

  return (
    <div>
      <Grid grow>
        <Grid.Col span={3}>
          <div
            style={{
              backgroundColor: "black",
              height: "100vh",
              color: "white",
            }}
          >
            {imageHero != null &&
            <div>
              <img src={imageHero} width="100%" />
            </div>
            }

          </div>
        </Grid.Col>
        <Grid.Col span={5}>
        <div
              style={{
                display: "flex",
                textAlign: "left",
                marginTop: "10vh",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ marginRight: "25px" }}>
                {imagePfp != null && (
                  <Avatar
                    src={imagePfp}
                    alt="Pfp"
                    size="xl"
                    radius="xl"
                  ></Avatar>
                )}
              </div>
              <div>
                <div>
                  <div style={{display:"flex"}}>
                    <h1 style={{ margin: "0px" }}>{userSlug}</h1>
                    <div style={{ marginTop: "5px", marginLeft: "10px" }}>
                      <DiscountCheck fill="green" color="white" size={40} />
                    </div>
                  </div>
                  <p style={{ margin: "0px" }}>{userAddr}</p>
                </div>
              </div>
            </div>


          {/* Ting under profil */}
          <div>
            
          <label>Slug: </label>
          <input
            id="fslug"
            type="text"
            value={userSlug}
            onChange={(e) => setUserSlug(e.target.value)}
          />
          </div>

          <div style={{ width: "30%", textAlign: "left" }}>
            <InputWrapper label="Input Slug">
              <TextInput
                icon={<At />}
                placeholder="Your email"
                styles={{ rightSection: { pointerEvents: "none" } }}
                rightSection={
                  <Tooltip
                    label="We do not send spam"
                    position="top"
                    placement="end"
                  >
                    <AlertCircle
                      size={16}
                      style={{ display: "block", opacity: 0.5 }}
                    />
                  </Tooltip>
                }
              />
            </InputWrapper>

            <InputWrapper label="Input Display name">
              <TextInput
                icon={<At />}
                placeholder="Your email"
                styles={{ rightSection: { pointerEvents: "none" } }}
                rightSection={
                  <Tooltip
                    label="We do not send spam"
                    position="top"
                    placement="end"
                  >
                    <AlertCircle
                      size={16}
                      style={{ display: "block", opacity: 0.5 }}
                    />
                  </Tooltip>
                }
              />
            </InputWrapper>

            <InputWrapper label="Input Display description">
              <TextInput
                icon={<At />}
                placeholder="Your email"
                styles={{ rightSection: { pointerEvents: "none" } }}
                rightSection={
                  <Tooltip
                    label="We do not send spam"
                    position="top"
                    placement="end"
                  >
                    <AlertCircle
                      size={16}
                      style={{ display: "block", opacity: 0.5 }}
                    />
                  </Tooltip>
                }
              />
            </InputWrapper>

            <p>Hero</p>
            <input type="file" onChange={heroFileSlectedHandler}></input>
            <Button onClick={HeroFileUploadhandler}>Upload file</Button>

            <p>Pfp</p>
            <input type="file" onChange={pfpFileSlectedHandler}></input>
            <Button onClick={PfpFileUploadhandler}>Upload file</Button>
          </div>

          <br />
          <br />
          <Button onClick={basicQuery}>Check Profile</Button>
          <Button onClick={checkDupes}>Create Profile</Button>
          <Button onClick={updateObject}>Update Profile</Button>
          <Link to={"/u/" + userSlug}>
            <Button>View Profile</Button>
          </Link>

          {/* {imageList != null &&
            imageList.map((url: any) => {
              return <img src={url} />;
            })} */}
        </Grid.Col>
      </Grid>
    </div>
  );
}
