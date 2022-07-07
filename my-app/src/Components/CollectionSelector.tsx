import { useEffect, useState } from "react";
import { Chips, Button, Chip } from "@mantine/core";
import { Moralis } from "moralis";
import { useMoralisWeb3Api } from "react-moralis";

type CollectionProps = {
  selectedCollections: any
}

export default function CustomCollectionSelector({ selectedCollections }: CollectionProps) {
  const Web3Api = useMoralisWeb3Api();
  const [selectedList, setSelectedList]: any = useState([]);
  const [personalCollectionList, setPersonalCollectionList]: any = useState([]);
  const [sortedList, setSortedList]: any = useState([]);
  const currentUser: any = Moralis.User.current();
  var userAddr = currentUser.get("ethAddress");

  let collectionMap = new Map<string, string>([
    ["0x4db1f25d3d98600140dfc18deb7515be5bd293af", "HAPE"],
    ["0x86c35fa9665002c08801805280ff6a077b23c98a", "Catblox"],
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
      <Chips multiple value={selectedCollections} onChange={setSelectedList}>
        {personalCollectionList.map((element: any, index: any) => {
          return <Chip key={element+index} value={element}>{element}</Chip>;
        })}
      </Chips>
    </div>
  );
}
