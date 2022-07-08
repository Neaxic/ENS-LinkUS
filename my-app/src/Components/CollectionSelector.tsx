import { useEffect, useState } from "react";
import { Chips, Button, Chip } from "@mantine/core";
import { Moralis } from "moralis";
import { useMoralisWeb3Api } from "react-moralis";

type CollectionProps = {
  selectedCollections: any,
  setSelectedCollections: any,
}

export default function CustomCollectionSelector({ selectedCollections, setSelectedCollections }: CollectionProps) {
  const Web3Api = useMoralisWeb3Api();
  const [selectedList, setSelectedList]: any = useState([]);
  const [personalCollectionList, setPersonalCollectionList]: any = useState([]);
  const currentUser: any = Moralis.User.current();
  var userAddr = currentUser.get("ethAddress");

  let collectionMap = new Map<string, string>([
    ["0x4db1f25d3d98600140dfc18deb7515be5bd293af", "HAPE"],
    ["0x86c35fa9665002c08801805280ff6a077b23c98a", "CATBLOX"],
    ["0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85", "ENS"],
    ["0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d", "BAYC"],
    ["0x60e4d786628fea6478f785a6d7e704777c86a7c6", "MAYC"],
    ["0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b", "CLONE X"],
  ]);

  useEffect(() => {
    fetchNFTs();
  }, []);

  const fetchNFTs = async () => {
    // get NFTs for current user on Mainnet
    const userEthNFTs: any = await Web3Api.account.getNFTs({
      chain: "eth",
      address: userAddr,
    });

    userEthNFTs.result.forEach((e: any) => {
      if (collectionMap.has(e.token_address)) {
        setPersonalCollectionList((prev: any) => [
          ...prev,
          collectionMap.get(e.token_address),
        ]);

        // personalCollectionList.array?.forEach((element:any) => {
        //     if(!sortedList.includes(element)){
        //         setSortedList((prev: any) => [
        //             ...prev,
        //             element,
        //           ]);
        //     }
        // });
      }
    });
  };

  //   const sortList = () => {
  //     uniqueChars = personalCollectionList.filter((element:any, index:any) => {
  //         return personalCollectionList.indexOf(element) === index;
  //     })
  //     setSortedList(uniqueChars)
  //     console.log(sortedList)
  //   }

  return (
    <div>
      <Chips multiple value={selectedCollections} onChange={setSelectedCollections}>
        {personalCollectionList.map((element: any, index: any) => {
          return <Chip key={element+index} value={element}>{element}</Chip>;
        })}
      </Chips>
    </div>
  );
}
