import { useMoralisQuery, useNewMoralisObject } from "react-moralis";
import { useMoralis } from "react-moralis";
import { Moralis } from "moralis";
import { useState, useEffect, useRef } from "react";

import {
  Button,
  Avatar,
  InputWrapper,
  TextInput,
  Accordion,
  Grid,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { At, DiscountCheck } from "tabler-icons-react";
import { storage } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import CustomColorPicker from "../Components/CustomColorPicker";
import CustomCollectionSelector from "../Components/CollectionSelector";
import LinksSelector from "../Components/LinksSelector";

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

  //Color picker
  const [selectedBGColor, setSelectedBGColor]: any = useState("#e9e9e9");
  const [selectedTextColor, setSelectedTextColor]: any = useState("#000000");

  //Links
  const [selectedLinks, setSelectedLinks] = useState([])

  const colorArr: any = [];
  const colorObj = {
    bgcolor: selectedBGColor,
    textColor: selectedTextColor,
  };

  const[linksArr, setlinksArr]:any = useState([])
  const linksObj = {
    type: "Twitter",
    link: "www.twitter.com/1CYETH",
  };

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
      setSelectedCollections(results[0].get("collections"));
      setSelectedBGColor(results[0].get("colors")[0].bgcolor);
      setSelectedTextColor(results[0].get("colors")[0].textColor);
      console.log("from DB:")
      console.log(results[0].get("links"))
      setlinksArr(results[0].get("links"))
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
    colorArr.push(colorObj);
    console.log(linksArr)

    instanceSlug.set("slug", userSlug);
    instanceSlug.set("description", userDescription);
    instanceSlug.set("displayName", userDisplayName);
    instanceSlug.set("collections", selectedCollections);
    instanceSlug.set("colors", colorArr);
    instanceSlug.set("links", linksArr);
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
    <div style={{ backgroundColor: selectedBGColor, color: selectedTextColor }}>
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
                  alt="Should have loaded in"
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
                {selectedCollections?.map((e: any) => {
                  return (
                    <div style={{ display: "flex", marginRight: "10px" }}>
                      <p>{e}</p>
                      <div style={{ marginTop: "19px", marginLeft: "2px" }}>
                        <DiscountCheck fill="green" color="white" size={20} />
                      </div>
                    </div>
                  );
                })}
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

          <div
            style={{
              display: "flex",
              marginTop: "4%",
              justifyContent: "center",
            }}
          >
            <div style={{ textAlign: "left", width: "60%" }}>
              <Accordion>
                <Accordion.Item label="Customization">
                  <InputWrapper
                    label="Input Slug"
                    description="Please enter the URL slug you want to link your profile to"
                  >
                    <TextInput
                      icon={<At />}
                      placeholder="Your profile slug"
                      value={userSlug}
                      onChange={(e) => setUserSlug(e.target.value)}
                      styles={{ rightSection: { pointerEvents: "none" } }}
                    />
                  </InputWrapper>

                  <InputWrapper label="Input Display name">
                    <TextInput
                      icon={<At />}
                      placeholder="Your profile display name"
                      value={userDisplayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      styles={{ rightSection: { pointerEvents: "none" } }}
                    />
                  </InputWrapper>

                  <InputWrapper label="Input Display description">
                    <TextInput
                      icon={<At />}
                      placeholder="Your email"
                      value={userDescription}
                      onChange={(e) => setDescription(e.target.value)}
                      styles={{ rightSection: { pointerEvents: "none" } }}
                    />
                  </InputWrapper>
                </Accordion.Item>
                <Accordion.Item label="Images">
                  <p>Hero</p>
                  <input type="file" onChange={heroFileSlectedHandler}></input>
                  <Button onClick={HeroFileUploadhandler}>Upload file</Button>

                  <p>Pfp</p>
                  <input type="file" onChange={pfpFileSlectedHandler}></input>
                  <Button onClick={PfpFileUploadhandler}>Upload file</Button>
                </Accordion.Item>
                <Accordion.Item label="Links">
                  <LinksSelector setlinksArr={setlinksArr} selectedLinks={selectedLinks} setSelectedLinks={setSelectedLinks}/>
                </Accordion.Item>
                <Accordion.Item label="Collection badges">
                  <div>
                    <p>Your wallets confirmed collections</p>
                    <p>Select what collection your want to display (max 5)</p>
                    <CustomCollectionSelector
                      selectedCollections={selectedCollections}
                      setSelectedCollections={setSelectedCollections}
                    ></CustomCollectionSelector>
                  </div>
                </Accordion.Item>
                <Accordion.Item label="Colors">
                  <div style={{ display: "flex" }}>
                    <CustomColorPicker
                      text="Profile background color"
                      selectedColor={selectedBGColor}
                      setSelectedColor={setSelectedBGColor}
                    />
                    <CustomColorPicker
                      text="Profile text color"
                      selectedColor={selectedTextColor}
                      setSelectedColor={setSelectedTextColor}
                    />
                  </div>
                </Accordion.Item>
              </Accordion>
              <Button onClick={checkDupes}>Save Profile</Button>

              <br />
              <br />
              <div>
                <p>Remember to press update after changes</p>
                <Button onClick={updateObject}>Update Profile</Button>
                <Link to={"/u/" + userSlug}>
                  <Button>View Profile</Button>
                </Link>
              </div>
            </div>
          </div>
        </Grid.Col>
      </Grid>
    </div>
  );
}
