import { Card, Image, Badge, Group, Stack } from '@mantine/core';
import Button from '@/components/Button/Button';
import styles from "./PromoSection.module.css"
import { FaBrain, FaBug, FaGithub, FaStar } from 'react-icons/fa6';
import CSMThumbnail from "@/assets/chatgpt-scrollmap-thumbnail.png";
import SSRThumbail from "@/assets/sidepanel-screen-reader-thumbnail.png"

const PromoSection = () => {

  function redirect(url: string) {
    return () => window.open(url)
  }

  return (
    <div className={styles.container}>

      <h3>Support (scroll down)</h3>

      <Card
        withBorder
      >
        <Card.Section>
          <Image
            src={CSMThumbnail}
            height={180}
            onClick={redirect("https://chromewebstore.google.com/detail/chat-gpt-scroll-map/apekbedjllgmacohbcckgipfhjddehkf")}
          />
        </Card.Section>

        <Stack
          justify="center"
          gap="md"
        >
          <Group justify="space-between" mt="md" mb="xs">
            <h3>Chat GPT Scroll Map</h3>
            <Badge color="green">Free</Badge>
          </Group>

          <p>
            Adds a minimap to you chatGPT chats like the one in VScode. Really useful
            when chatpgt starts yapping.
          </p>

          <Button onClick={redirect("https://chromewebstore.google.com/detail/chat-gpt-scroll-map/apekbedjllgmacohbcckgipfhjddehkf")}>
            Install the extension
          </Button>
        </Stack>
      </Card>


      <Card
        withBorder
      >
        <Card.Section>
          <Image
            src={SSRThumbail}
            height={180}
            onClick={redirect("https://chromewebstore.google.com/detail/chat-gpt-scroll-map/apekbedjllgmacohbcckgipfhjddehkf")}
          />
        </Card.Section>

        <Stack
          justify="center"
          gap="md"
        >
          <Group justify="space-between" mt="md" mb="xs">
            <h3>Sidepanel screen reader</h3>
            <Badge color="green">Free</Badge>
          </Group>

          <p>
            An accessibility focused version of this extension. Has the ability to choose from
            a variety of different voices.
          </p>

          <Button onClick={redirect("https://chromewebstore.google.com/detail/sidepanel-screen-reader-t/pblolbkbppkdpkadigoiahnknfndlglp")}>
            Install the extension
          </Button>
        </Stack>
      </Card>

      <Stack>
        <Button onClick={redirect("https://github.com/Aebel-Shajan/subway_surfers_screen_reader")}>
          <FaGithub/> Star the repo
        </Button>
        <Button onClick={redirect("https://github.com/Aebel-Shajan/subway_surfers_screen_reader/issues")}>
          <FaBug/> Give feedback
        </Button>
        <Button onClick={redirect("https://chromewebstore.google.com/detail/subway-surfers-screen-rea/jcijfneifjnhbgahlokgkmpcnocgpegd")}>
          <FaStar /> Leave a review
        </Button>
        <Button onClick={redirect("https://buymeacoffee.com/aebel")}>
          <FaBrain /> Save a child from Brain rot 🥺
        </Button>
      </Stack>




    </div >
  );
}

export default PromoSection;