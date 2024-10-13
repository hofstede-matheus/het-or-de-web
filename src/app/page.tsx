"use client";
import { SearchIcon } from "@chakra-ui/icons";
import styles from "./page.module.css";
import { InputGroup, InputLeftElement, Input, Stack } from "@chakra-ui/react";
import { Text, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { useGetNoumQuery } from "./api/queries";

export default function Home() {
  const [search, setSearch] = useState("");

  const { data, isLoading, error } = useGetNoumQuery(search);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
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
              display: "flex",
              flexDirection: "row",
            }}
          >
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Type a dutch noun here"
              value={search}
              onChange={handleSearch}
            />
          </InputGroup>
          {isLoading && <Spinner size="lg" />}
          {error && (
            <Text
              style={{
                textAlign: "center",
                width: "100%",
              }}
              fontSize="4xl"
            >
              An error occured
            </Text>
          )}
          <Text
            style={{
              textAlign: "center",
              width: "100%",
            }}
            fontSize="4xl"
          >
            {data?.noun}
          </Text>
        </Stack>
      </div>
    </main>
  );
}
