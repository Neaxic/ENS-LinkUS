import { useMoralisQuery, useNewMoralisObject } from "react-moralis";
import { useMoralis } from "react-moralis";
import { Moralis } from "moralis";
import { useState, useEffect, useRef } from "react";

import {
  Tooltip,
  Button,
  Avatar,
  InputWrapper,
  TextInput,
  Grid,
  ColorInput,
  ColorPicker,
} from "@mantine/core";
import { Link } from "react-router-dom";
import {
  At,
  AlertCircle,
  DiscountCheck,
  GitPullRequestDraft,
} from "tabler-icons-react";
import { storage } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { idText } from "typescript";
import CustomColorPicker from "../Components/CustomColorPicker";
import CustomCollectionSelector from "../Components/CollectionSelector";

export default function Settings() {
  var currentUser: any = Moralis.User.current();
  var userAddr = currentUser.get("ethAddress");
  const [userSlug, setUserSlug] = useState("");
  const [userDisplayName, setDisplayName] = useState("A display name");
  const [userDescription, setDescription] = useState("A description");
  const [instanceSlug, setInstanceSlug]: any = useState();

  //Image shit
  const [selectedHeroFile, setHeroSelectedFile]: any = useState(null);
  const [selectedPfpFile, setPfpSelectedFile]: any = useState(null);
  const [imagePfp, setImagePfp]: any = useState();
  const [imageHero, setImageHero]: any = useState();
  const imageHeroRef = ref(storage, `users/${userAddr}/hero`);
  const imagePfpRef = ref(storage, `users/${userAddr}/pfp`);

  //Collection Selector
  const [selectedCollections, setSelectedCollections]: any = useState(null);

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
      setDescription(results[0].get("description"));
      setDisplayName(results[0].get("displayName"));
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
      displayName: userDisplayName,
      description: userDescription,
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
    instanceSlug.set("description", userDescription);
    instanceSlug.set("displayName", userDisplayName);
    instanceSlug.save();
  };

  //FILE UPLOAD SHIT
  const heroFileSlectedHandler = (event: any) => {
    setHeroSelectedFile(event.target.files[0]);
  };

  const HeroFileUploadhandler = () => {
    if (selectedHeroFile == null) return;

    const imgRef = ref(storage, `users/${userAddr}/hero/hero`);
    uploadBytes(imgRef, selectedHeroFile).then((snapshot) => {
      //run after upload
      getDownloadURL(snapshot.ref).then((url) => {
        setImageHero(url);
      });
    });
  };

  const pfpFileSlectedHandler = (event: any) => {
    setPfpSelectedFile(event.target.files[0]);
  };

  const PfpFileUploadhandler = () => {
    if (selectedPfpFile == null) return;
    const imgRef = ref(storage, `users/${userAddr}/pfp/pfp`);
    uploadBytes(imgRef, selectedPfpFile).then((snapshot) => {
      //run after upload
      getDownloadURL(snapshot.ref).then((url) => {
        setImagePfp(url);
      });
    });
  };

  return (
    <div style={{ backgroundColor: "white" }}>
      <Grid grow>
        <Grid.Col span={3}>
          <div
            style={{
              backgroundColor: "black",
              height: "100vh",
              color: "white",
            }}
          >
            {imageHero != null && (
              <div>
                <img
                  style={{ objectFit: "cover", height: "100vh", width: "100%" }}
                  src={imageHero}
                  width="100%"
                />
              </div>
            )}
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
                <Avatar src={imagePfp} alt="Pfp" size="xl" radius="xl"></Avatar>
              )}
            </div>
            <div>
              <div>
                <div style={{ display: "flex" }}>
                  <h1 style={{ margin: "0px" }}>{userDisplayName}</h1>
                  <div style={{ marginTop: "5px", marginLeft: "10px" }}>
                    <DiscountCheck fill="green" color="white" size={40} />
                  </div>
                </div>
                <p style={{ margin: "0px" }}>{userAddr}</p>
              </div>
              <div style={{ display: "flex", marginTop: "-15px" }}>
                <div style={{ display: "flex" }}>
                  <p>BAYC</p>
                  <div style={{ marginTop: "19px", marginLeft: "2px" }}>
                    <DiscountCheck fill="green" color="white" size={20} />
                  </div>
                </div>
                <div style={{ display: "flex", marginLeft: "10px" }}>
                  <p>MAYC</p>
                  <div style={{ marginTop: "19px", marginLeft: "2px" }}>
                    <DiscountCheck fill="green" color="white" size={20} />
                  </div>
                </div>
                <div style={{ display: "flex", marginLeft: "10px" }}>
                  <p>RTFKT</p>
                  <div style={{ marginTop: "19px", marginLeft: "2px" }}>
                    <DiscountCheck fill="green" color="white" size={20} />
                  </div>
                </div>
                <div style={{ display: "flex", marginLeft: "10px" }}>
                  <p>DOODLE</p>
                  <div style={{ marginTop: "19px", marginLeft: "2px" }}>
                    <DiscountCheck fill="green" color="white" size={20} />
                  </div>
                </div>
              </div>
              <div>
                <p style={{ margin: "0px" }}>{userDescription}</p>
              </div>
            </div>
          </div>


          {/* Ting under profil */}
          {/* <div>
            <label>Slug: </label>
            <input
              id="fslug"
              type="text"
              value={userSlug}
              onChange={(e) => setUserSlug(e.target.value)}
            />
          </div> */}

          <div style={{ display: "flex", marginTop:"4%", justifyContent: "center" }}>
            <div style={{ textAlign: "left", maxWidth: "70%" }}>
              <InputWrapper label="Input Slug">
                <TextInput
                  icon={<At />}
                  placeholder="Your profile slug"
                  value={userSlug}
                  onChange={(e) => setUserSlug(e.target.value)}
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
                  placeholder="Your profile display name"
                  value={userDisplayName}
                  onChange={(e) => setDisplayName(e.target.value)}
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
                  value={userDescription}
                  onChange={(e) => setDescription(e.target.value)}
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

              <div >
                <p>Your wallets confirmed collections</p>
                <p>Select what collection your want to display (max 5)</p>
                <CustomCollectionSelector selectedCollections={selectedCollections}></CustomCollectionSelector>
                <Button onClick={() => console.log(selectedCollections)}></Button>
              </div>

              <p>Hero</p>
              <input type="file" onChange={heroFileSlectedHandler}></input>
              <Button onClick={HeroFileUploadhandler}>Upload file</Button>

              <p>Pfp</p>
              <input type="file" onChange={pfpFileSlectedHandler}></input>
              <Button onClick={PfpFileUploadhandler}>Upload file</Button>

              <p>Background color picker</p>
              <CustomColorPicker></CustomColorPicker>

              <br />
              <br />
              <Button onClick={checkDupes}>Save Profile</Button>
              <Button onClick={updateObject}>Update Profile</Button>
              <Link to={"/u/" + userSlug}>
                <Button>View Profile</Button>
              </Link>
            </div>
          </div>
        </Grid.Col>
      </Grid>
    </div>
  );
}
