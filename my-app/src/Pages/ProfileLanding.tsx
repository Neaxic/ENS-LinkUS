import { useMoralisQuery, useNewMoralisObject } from "react-moralis";
import { useMoralis } from "react-moralis";
import { Moralis } from "moralis";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Grid, ThemeIcon, Avatar } from "@mantine/core";
import {
  BrandTwitter,
  BrandYoutube,
  CurrencyEthereum,
  DiscountCheck,
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

  useEffect(() => {
    basicQuery();
  }, []);

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
    }
    return results;
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
              </div>
            </div>

            <div style={{ textAlign: "left" }}>
              <p style={{ margin: "0px" }}>{description}</p>
            </div>

            <div style={{ display: "block", marginTop: "60px" }}>
              <div>
                <Button
                  component="a"
                  target="_blank"
                  size="xl"
                  rel="noopener noreferrer"
                  href="https://twitter.com/1CYETH"
                  leftIcon={<BrandTwitter size={25} />}
                  styles={(theme) => ({
                    root: {
                      backgroundColor: "#00acee",
                      border: 0,
                      height: 42,
                      paddingLeft: 20,
                      paddingRight: 20,

                      "&:hover": {
                        backgroundColor: theme.fn.darken("#00acee", 0.05),
                      },
                    },

                    leftIcon: {
                      marginRight: 15,
                    },
                  })}
                >
                  Follow on Twitter
                </Button>
              </div>
              <div>
                <Button
                  component="a"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="xl"
                  href="https://twitter.com/mantinedev"
                  leftIcon={<BrandYoutube size={25} />}
                  styles={(theme) => ({
                    root: {
                      backgroundColor: "#FF2222",
                      border: 0,
                      height: 42,
                      paddingLeft: 20,
                      paddingRight: 20,

                      "&:hover": {
                        backgroundColor: theme.fn.darken("#FF2222", 0.1),
                      },
                    },

                    leftIcon: {
                      marginRight: 15,
                    },
                  })}
                >
                  Follow on Youtube
                </Button>
              </div>
              <div>
                <Button
                  component="a"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="xl"
                  href="https://twitter.com/mantinedev"
                  leftIcon={<CurrencyEthereum size={25} />}
                  styles={(theme) => ({
                    root: {
                      backgroundColor: "#2289FF",
                      border: 0,
                      height: 42,
                      paddingLeft: 20,
                      paddingRight: 20,

                      "&:hover": {
                        backgroundColor: theme.fn.darken("#2289FF", 0.1),
                      },
                    },

                    leftIcon: {
                      marginRight: 15,
                    },
                  })}
                >
                  Check my Opensea
                </Button>
              </div>
            </div>
          </div>
        </Grid.Col>
      </Grid>
    </div>
  );
}
