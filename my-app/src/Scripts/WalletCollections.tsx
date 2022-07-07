import { useState } from "react";
import { Chips, Button, Chip } from "@mantine/core";

export default function WalletCollections() {
    const [selectedList, setSelectedList]:any = useState(['HAPE'])

  return (
    <div>
      <Chips multiple value={selectedList} onChange={setSelectedList}>
        <Chip value="HAPE">Hape</Chip>
        <Chip value="Catblox">Catblox</Chip>
        <Chip value="MAYC">MAYC</Chip>
        <Chip value="BAYC">BAYC</Chip>
        <Chip value="RTFKT">RTFKT</Chip>
        <Chip value="ENS">ENS</Chip>
      </Chips>

      <Button onClick={() =>console.log(selectedList)}>log</Button>
    </div>
  );
}
