import { Input, MultiSelect, Button, InputWrapper } from "@mantine/core";
import { useState } from "react";
import { CurrencyEthereum } from "tabler-icons-react";

type linksSelectorProps = {
  selectedLinks: any;
  setlinksArr: any;
  setSelectedLinks: any;
};

var linksArr: any = [];

const linksObj = {
  type: "Twitter",
  link: "www.twitter.com/1CYETH",
};

export default function LinksSelector({
  setlinksArr,
  selectedLinks,
  setSelectedLinks,
}: linksSelectorProps) {
  const data = [
    { value: "Custom", label: "Custom" },
    { value: "Opensea", label: "Opensea" },
    { value: "Etherscan", label: "Etherscan" },
    { value: "Twitter", label: "Twitter" },
    { value: "Youtube", label: "Youtube" },
    { value: "Discord", label: "Discord" },
    { value: "Snapchat", label: "Snapchat" },
    { value: "Linkedin", label: "Linkedin" },
    { value: "Instagram", label: "Instagram" },
    { value: "Tiktok", label: "Tiktok" },
    { value: "Spotify", label: "Spotify" },
  ];

  const getLinks = () => {
    linksArr = [];

    selectedLinks.forEach((e: any) => {
      data.forEach((element) => {
        if (e == element.label) {
          linksArr.push({ type: element.label, link: element.value });
        }
      });
    });

    setlinksArr(linksArr);
  };

  return (
    <div>
      <p>
        This section is a tiny bit buggy in current release, please select
        everything from the selectionbar you want, before you entering the
        links.
      </p>
      <p>Include full URLs in the inputs</p>
      <div>
        <MultiSelect
          data={data}
          limit={10}
          searchable
          clearButtonLabel="Clear selection"
          clearable
          value={selectedLinks}
          onChange={setSelectedLinks}
          label="Pick what links youd like to showcase"
          placeholder="Pick all that you like"
        />
      </div>
      <div style={{ marginTop: "20px", marginBottom: "50px" }}>
        {selectedLinks?.map((element: any, index: any) => {
          return (
            <InputWrapper
              required
              key={element}
              label={element + " URL"}
              style={{ marginBottom: "5px" }}
            >
              <Input
                icon={<CurrencyEthereum size={16} />}
                key={element}
                placeholder={element}
                rightSectionWidth={70}
                onChange={(link: any) => {
                  data.filter((obj) => {
                    return obj.label === element;
                  })[0].value = link.target.value;
                }}
                style={{ marginTop: "2px" }}
                styles={{ rightSection: { pointerEvents: "none" } }}
              />
            </InputWrapper>
          );
        })}
      </div>
      <Button onClick={getLinks}>Save</Button>
    </div>
  );
}
