import Button from "@/components/Button/Button";
import { DEFAULT_VIDEOS } from "@/constants";
import { VideoInfo } from "@/types/options";
import { Input, Table } from "@mantine/core";
import getVideoId from "get-video-id";
import { useState } from "react";
import { CgClose } from "react-icons/cg";

interface VideoSelectProps {
  videos: VideoInfo[],
  setVideos: CallableFunction,
  handleSelectVideo: CallableFunction,
  selectedVideo: number
}


const VideoSelect = ({ videos, setVideos, handleSelectVideo, selectedVideo}: VideoSelectProps) => {
  // States
  const [name, setName] = useState<string>("")
  const [url, setUrl] = useState<string>("")

  // Functions
  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value)
  }

  function handleUrlChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUrl(event.target.value)
  }

  function handleAddVideo() {
    if (videos.map(video => video.name).includes(name)) {
      alert("Video name already exists")
      return
    }
    if (getVideoId(url).id === undefined) {
      alert("Video url invalid")
      return
    }
    const newVideo: VideoInfo = {
      index: videos.length,
      name: name,
      url: url
    }
    setVideos([...videos, newVideo])
    setName("")
    setUrl("")
  }

  function handleRemoveVideo(videoToRemove: VideoInfo) {
    if (isVideoDefault(videoToRemove)) {
      alert("Can't remove default videos")
      return
    }
    const newVideos = videos.filter(video => video.index !== videoToRemove.index)
    setVideos(newVideos)
    if (selectedVideo === videoToRemove.index) {
      handleSelectVideo("0")
    }
  }

  function isVideoDefault(videoToCheck: VideoInfo) {
    return DEFAULT_VIDEOS.map(video => video.index).includes(videoToCheck.index)
  }

  // JSX
  const rows = videos.map((video) => (
    <Table.Tr key={video.index}>
      <Table.Td>{video.name}</Table.Td>
      <Table.Td style={{wordBreak: "break-all"}}>{video.url}</Table.Td>
      <Table.Td>
        {
          isVideoDefault(video) 
          ? 
          null
          :
          <Button 
            style={{ background: "red" }}
            onClick={() => handleRemoveVideo(video)}
            >
            <CgClose />
          </Button>
        }

      </Table.Td>
    </Table.Tr>
  ))
  return (
    <div>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Video name</Table.Th>
            <Table.Th>Video url</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>

      <div>
        <Input placeholder="Enter video name" value={name} onChange={handleNameChange} />
        <Input placeholder="Enter video url" value={url} onChange={handleUrlChange} />
        <Button onClick={handleAddVideo}>
          Add video
        </Button>
      </div>
    </div>
  );
}

export default VideoSelect;