import { Transcript } from "../types/transcript.ts";

const formatTimestamp = (offset: number): string => {
  const hours = Math.floor(offset / 3600);
  const minutes = Math.floor((offset % 3600) / 60);
  const seconds = Math.floor(offset % 60);

  const paddedHours = hours.toString().padStart(2, "0");
  const paddedMinutes = minutes.toString().padStart(2, "0");
  const paddedSeconds = seconds.toString().padStart(2, "0");

  // Only want hours to show up if there is an hour
  if (hours > 0) {
    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
  }

  return `${paddedMinutes}:${paddedSeconds}`;
};

const dummyTranscript: Transcript = [
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    duration: "2",
    offset: 0,
    timestamp: formatTimestamp(0),
  },
  {
    text: "Vestibulum vehicula eros vel sapien ultrices, at bibendum libero.",
    duration: "5",
    offset: 2,
    timestamp: formatTimestamp(2),
  },
  {
    text: "Sed non libero et tortor tincidunt pharetra.",
    duration: "8",
    offset: 7,
    timestamp: formatTimestamp(7),
  },
  {
    text: "Curabitur ultricies dui at justo fermentum, ac ullamcorper nulla tempus.",
    duration: "12",
    offset: 10,
    timestamp: formatTimestamp(10),
  },
  {
    text: "Nullam a diam sit amet felis gravida ultricies.",
    duration: "15",
    offset: 14,
    timestamp: formatTimestamp(14),
  },
  {
    text: "Phasellus euismod dolor in eros tincidunt tincidunt.",
    duration: "20",
    offset: 17,
    timestamp: formatTimestamp(17),
  },
  {
    text: "Praesent malesuada urna non turpis fermentum, a tincidunt nisi facilisis.",
    duration: "22",
    offset: 37,
    timestamp: formatTimestamp(37),
  },
  {
    text: "Nulla facilisi. Vivamus luctus eros ut nisi vehicula, non maximus elit tincidunt.",
    duration: "19",
    offset: 59,
    timestamp: formatTimestamp(59),
  },
  {
    text: "Integer sed dui et nulla tempor dapibus vel at eros.",
    duration: "16",
    offset: 78,
    timestamp: formatTimestamp(78),
  },
  {
    text: "Mauris volutpat erat at risus cursus lacinia.",
    duration: "18",
    offset: 94,
    timestamp: formatTimestamp(94),
  },
  {
    text: "Cras ac sem in metus interdum consequat.",
    duration: "21",
    offset: 112,
    timestamp: formatTimestamp(112),
  },
  {
    text: "Vestibulum a felis et lectus malesuada gravida.",
    duration: "23",
    offset: 133,
    timestamp: formatTimestamp(133),
  },
  {
    text: "Donec imperdiet dui at ex faucibus, vel congue eros vehicula.",
    duration: "25",
    offset: 156,
    timestamp: formatTimestamp(156),
  },
  {
    text: "Suspendisse potenti. Curabitur pharetra nunc sed orci sollicitudin feugiat.",
    duration: "17",
    offset: 181,
    timestamp: formatTimestamp(181),
  },
  {
    text: "Aenean at mauris et est fermentum tincidunt non euismod augue.",
    duration: "26",
    offset: 198,
    timestamp: formatTimestamp(198),
  },
  {
    text: "Aliquam erat volutpat. Sed vel sem in quam dapibus scelerisque.",
    duration: "24",
    offset: 224,
    timestamp: formatTimestamp(224),
  },
  {
    text: "Ut bibendum ligula a eros facilisis, eu dictum quam pretium.",
    duration: "20",
    offset: 248,
    timestamp: formatTimestamp(248),
  },
  {
    text: "Praesent in orci nec risus malesuada efficitur ut at nisl.",
    duration: "15",
    offset: 268,
    timestamp: formatTimestamp(268),
  },
  {
    text: "Nullam id justo sed odio convallis tincidunt.",
    duration: "18",
    offset: 283,
    timestamp: formatTimestamp(283),
  },
  {
    text: "Sed malesuada turpis vitae erat fermentum, sit amet dictum elit fermentum.",
    duration: "22",
    offset: 301,
    timestamp: formatTimestamp(301),
  },
  {
    text: "Phasellus tempor erat et lorem auctor, non egestas dui varius.",
    duration: "25",
    offset: 323,
    timestamp: formatTimestamp(323),
  },
  {
    text: "Duis quis neque sit amet nisl convallis pretium.",
    duration: "21",
    offset: 348,
    timestamp: formatTimestamp(348),
  },
  {
    text: "Etiam ut lectus vitae urna gravida interdum.",
    duration: "17",
    offset: 369,
    timestamp: formatTimestamp(369),
  },
  {
    text: "Mauris et justo sed risus tristique mollis.",
    duration: "18",
    offset: 386,
    timestamp: formatTimestamp(386),
  },
  {
    text: "In hac habitasse platea dictumst.",
    duration: "20",
    offset: 404,
    timestamp: formatTimestamp(404),
  },
  {
    text: "Aliquam consectetur elit eu velit sagittis, ac blandit tortor ultricies.",
    duration: "23",
    offset: 424,
    timestamp: formatTimestamp(424),
  },
  {
    text: "Donec lacinia arcu sit amet gravida faucibus.",
    duration: "25",
    offset: 447,
    timestamp: formatTimestamp(447),
  },
  {
    text: "Fusce vel velit nec arcu vestibulum sodales.",
    duration: "19",
    offset: 472,
    timestamp: formatTimestamp(472),
  },
  {
    text: "Vestibulum dictum purus at lectus efficitur, sed facilisis nisi dignissim.",
    duration: "20",
    offset: 491,
    timestamp: formatTimestamp(491),
  },
];

export default dummyTranscript;
