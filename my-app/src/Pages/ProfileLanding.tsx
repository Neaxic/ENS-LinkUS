import { useMoralisQuery } from "react-moralis";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Grid, Avatar } from "@mantine/core";
import {
  BrandTwitter,
  BrandYoutube,
  CurrencyEthereum,
  DiscountCheck,
  World,
} from "tabler-icons-react";
import { storage } from "../firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";

export default function Landing() {
  let { urlSlug } = useParams();
  const [ownerAddr, setOwnerAddr] = useState("");
  const [ownerDisplayName, setOwnerDisplayName] = useState("");
  const [description, setDescription] = useState("");
  const [imagePfp, setImagePfp]: any = useState();
  const [imageHero, setImageHero]: any = useState();
  const [selectedCollections, setSelectedCollections]: any = useState();

//Link shit
  const [linksArr, setlinksArr]: any = useState([]);

  //Colors
  const [selectedBGColor, setSelectedBGColor]: any = useState("#e9e9e9");
  const [selectedTextColor, setSelectedTextColor]: any = useState("#000000");

  useEffect(() => {
    basicQuery();
  }, []);

  const btnDesigns = [
    {
      type: "Youtube",
      color: "#FF0000",
      icon: "BrandYoutube",
    },
    {
      type: "Opensea",
      color: "#2081E2",
      icon: "CurrencyEthereum",
    },{
      type: "Instagram",
      color: "#EF0075",
      icon: "CurrencyEthereum",
    },{
      type: "Tiktok",
      color: "#000000",
      icon: "CurrencyEthereum",
    },
    {
      type: "Discord",
      color: "#485EF4",
      icon: "CurrencyEthereum",
    },
    {
      type: "Twitter",
      color: "#1D9BF0",
      icon: "BrandTwitter",
    },
    {
      type: "Custom",
      color: "#3D3D3D",
      icon: "BrandTwitter",
    },
    {
      type: "Etherscan",
      color: "#21325B",
      icon: "BrandTwitter",
    },{
      type: "Spotify",
      color: "#1DB954",
      icon: "BrandTwitter",
    },
  ];

  useEffect(() => {
    const imageHeroRef = ref(storage, `users/${ownerAddr}/hero`);
    const imagePfpRef = ref(storage, `users/${ownerAddr}/pfp`);

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
  }, [ownerAddr]);

  //Fetch addr from slug
  const { fetch } = useMoralisQuery(
    "Slugs",
    (query) => query.equalTo("slug", urlSlug),
    [],
    { autoFetch: false }
  );

  const basicQuery = async () => {
    const results: any = await fetch();
    if (!(results?.length == 0)) {
      setOwnerAddr(results[0].get("owner"));
      setOwnerDisplayName(results[0].get("displayName"));
      setDescription(results[0].get("description"));
      setlinksArr(results[0].get("links"));

      setSelectedCollections(results[0].get("collections"));
      if (
        results[0].get("colors") != null &&
        results[0].get("colors") != undefined
      ) {
        setSelectedBGColor(results[0].get("colors")[0].bgcolor);
        setSelectedTextColor(results[0].get("colors")[0].textColor);
      }
    }
    return results;
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
          <div>
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
              <div style={{ marginTop: "-15px" }}>
                <div>
                  <div style={{ display: "flex" }}>
                    <h1 style={{ margin: "0px" }}>{ownerDisplayName}</h1>
                    <div style={{ marginTop: "5px", marginLeft: "10px" }}>
                      <DiscountCheck fill="green" color="white" size={40} />
                    </div>
                  </div>
                  <p style={{ margin: "0px" }}>{ownerAddr}</p>
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
              </div>
            </div>

            <div style={{ textAlign: "left" }}>
              <p style={{ margin: "0px" }}>{description}</p>
            </div>

            <div style={{ display:"flex", width:"100%", justifyContent:"center", height: "100%", marginTop: "60px" }}>
              <div style={{ width: "60%"}}>
                {linksArr.map((element: any) => {
                  var design = btnDesigns.filter((obj) => {
                    return obj.type === element.type;
                  })[0];

                  return (
                    <Button
                      component="a"
                      target="_blank"
                      rel="noopener noreferrer"
                      size="xl"
                      key={element?.type}
                      href={element.link}
                      leftIcon={<CurrencyEthereum size={25} />}
                      styles={(theme) => ({
                        root: {
                          display: "block",
                          backgroundColor: design.color,
                          border: 0,
                          height: 52,
                          marginBottom: 10,
                          paddingLeft: 20,
                          paddingRight: 20,

                          "&:hover": {
                            backgroundColor: theme.fn.darken(design.color, 0.1),
                          },
                        },

                        leftIcon: {
                          marginRight: 15,
                        },
                      })}
                    >
                      {element.type}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </Grid.Col>
      </Grid>
    </div>
  );
}
