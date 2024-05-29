"use client";
import { SearchIcon } from "@chakra-ui/icons";
import styles from "./page.module.css";
import { InputGroup, InputLeftElement, Input, Stack } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { useState } from "react";
import useDebounce from "./hooks/useDebounce";

export default function Home() {
  const [search, setSearch] = useState("");
  const [response, setResponse] = useState("Type a dutch noun here");

  useDebounce(
    () => {
      if (search === "") {
        return;
      }
      fetch(`/api?noun=${search}`)
        .then((res) => res.json())
        .then((data) => {
          setResponse(data.noun);
        })
        .catch((err) => {
          setResponse("An error occured");
        });
    },
    [search],
    800
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    const isBlank = e.target.value === "";
    if (isBlank) {
      setResponse("Type a dutch noun here");
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <Stack
          spacing={3}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <InputGroup
            style={{
              minWidth: "400px",
              maxWidth: "400px",
            }}
          >
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Search for a noun"
              value={search}
              onChange={handleSearch}
            />
          </InputGroup>
          <Text
            style={{
              textAlign: "center",
              width: "100%",
            }}
            fontSize="4xl"
          >
            {response}
          </Text>
        </Stack>
      </div>
    </main>
  );
}
