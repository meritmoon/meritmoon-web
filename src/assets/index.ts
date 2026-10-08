// src/assets/index.ts

// ============================================================
// IMPORT ASSETS
// ============================================================

// Images & Design Textures
import banner from "./images/banner.png";
import darkBrickWall from "./design/dark-brick-wall.png";
import spotCursor from "./design/spot48.png";
import loadingImg from "./images/loading.png";
import errorImg from "./images/error.png";

// Social / UI SVGs
import angellistSvg from "./design/angellist.svg";
import facebookSvg from "./design/facebook.svg";
import githubSvg from "./design/github.svg";
import linkedinSvg from "./design/linkedin.svg";
import mediumSvg from "./design/medium.svg";
import twitterSvg from "./design/twitter.svg";
import instagramIcon from "./icons/instagram.svg";
import googleIcon from "./icons/google.svg";
import meritmoonLogoSvg from "./icons/logo.svg";
import mascotSvg from "./icons/mascot.svg";
import mascotMeditatingSvg from "./icons/mascot-meditating.svg";
import mascotJoyfulSvg from "./icons/mascot-joyful.svg";
import grassFieldSvg from "./icons/grass-field.svg";
import quoteIcon from "./icons/quote.svg";

// Icons (Library components - Heroicons, Lucide, etc.)
import {
  MoonIcon,
  SunIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
  HeartIcon,
  LanguageIcon,
  UserIcon,
  HomeIcon,
  ArrowPathIcon,
  MinusCircleIcon,
  PencilSquareIcon,
  TrashIcon,
  PlusIcon,
  Bars3Icon,
  BellIcon,
  ArrowRightStartOnRectangleIcon,
  CheckIcon,
  XMarkIcon,
  BellAlertIcon,
  ChatBubbleLeftRightIcon,
  CubeIcon,
  InboxStackIcon,
  KeyIcon,
  UserGroupIcon,
  ArchiveBoxIcon,
  DocumentDuplicateIcon,
  ChatBubbleBottomCenterTextIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronUpDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EllipsisVerticalIcon,
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  EyeSlashIcon,
  EnvelopeIcon,
  LockClosedIcon,
  SparklesIcon,
  DocumentTextIcon,
  BanknotesIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  ClockIcon,
  MicrophoneIcon,
  StopIcon,
  SpeakerWaveIcon,
  PlayIcon,
  PhotoIcon,
  TagIcon,
  DevicePhoneMobileIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";

// Videos
import sampleVideo from "./videos/sample.mp4";

// Sounds
import noteSound from "./sounds/note.mp3";

// ============================================================
// IMAGE ASSETS (for Asset component)
// ============================================================

export const images = {
  banner: { src: banner, alt: "MeritMoon Banner", title: "MeritMoon Banner" },
  darkBrickWall: {
    src: darkBrickWall,
    alt: "Dark Brick Wall",
    title: "Dark Brick Wall Texture",
  },
  spotCursor: { src: spotCursor, alt: "Spot Cursor", title: "Laser Cursor" },
  loading: { src: loadingImg, alt: "Loading...", title: "Loading Media" },
  error: {
    src: errorImg,
    alt: "Failed to load image",
    title: "Image Load Failed",
  },
} as const;

// ============================================================
// ICON ASSETS (for Asset component)
// ============================================================

export const icons = {
  logo: { src: meritmoonLogoSvg, alt: "MeritMoon Logo", title: "MeritMoon" },
  mascot: { src: mascotSvg, alt: "MeritMoon Full Moon Mascot", title: "MeritMoon Mascot" },
  mascotMeditating: { src: mascotMeditatingSvg, alt: "MeritMoon Meditating Mascot", title: "MeritMoon Meditating" },
  mascotJoyful: { src: mascotJoyfulSvg, alt: "MeritMoon Joyful Mascot", title: "MeritMoon Joyful" },
  grassField: { src: grassFieldSvg, alt: "Grass Field", title: "Grass Field" },
  instagram: { src: instagramIcon, alt: "Instagram icon", title: "Instagram" },
  google: { src: googleIcon, alt: "Google icon", title: "Google" },
  github: { src: githubSvg, alt: "GitHub", title: "GitHub" },
  linkedin: { src: linkedinSvg, alt: "LinkedIn", title: "LinkedIn" },
  angellist: { src: angellistSvg, alt: "AngelList", title: "AngelList" },
  medium: { src: mediumSvg, alt: "Medium", title: "Medium" },
  twitter: { src: twitterSvg, alt: "Twitter / X", title: "Twitter / X" },
  facebook: { src: facebookSvg, alt: "Facebook", title: "Facebook" },
  quote: { src: quoteIcon, alt: "Quote", title: "Quote" },
} as const;

// ============================================================
// VIDEO ASSETS (for Video component)
// ============================================================

export const videos = {
  sample: { src: sampleVideo, alt: "Sample video", title: "Sample Video" },
} as const;

// ============================================================
// SOUND ASSETS
// ============================================================

export const sounds = {
  note: { src: noteSound, alt: "Note sound", title: "Note" },
} as const;

// ============================================================
// ICON LIBRARY COMPONENTS (for direct use)
// ============================================================

export const iconsLib = {
  sun: SunIcon,
  moon: MoonIcon,
  check: CheckCircleIcon,
  warning: ExclamationCircleIcon,
  error: XCircleIcon,
  heart: HeartIcon,
  language: LanguageIcon,
  user: UserIcon,
  home: HomeIcon,
  arrowPath: ArrowPathIcon,
  minusCircle: MinusCircleIcon,
  pencilSquare: PencilSquareIcon,
  trash: TrashIcon,
  plus: PlusIcon,
  bell: BellIcon,
  logout: ArrowRightStartOnRectangleIcon,
  checkr: CheckIcon,
  bellAlert: BellAlertIcon,
  chatBubbleLeftRight: ChatBubbleLeftRightIcon,
  cube: CubeIcon,
  inboxStack: InboxStackIcon,
  key: KeyIcon,
  userGroup: UserGroupIcon,
  archiveBox: ArchiveBoxIcon,
  feedback: ChatBubbleBottomCenterTextIcon,
  chat: ChatBubbleLeftRightIcon,
  menu: Bars3Icon,
  close: XMarkIcon,
  chevronDown: ChevronDownIcon,
  chevronUp: ChevronUpIcon,
  chevronUpDown: ChevronUpDownIcon,
  chevronLeft: ChevronLeftIcon,
  chevronRight: ChevronRightIcon,
  arrowLeft: ArrowLeftIcon,
  arrowRight: ArrowRightIcon,
  info: InformationCircleIcon,
  search: MagnifyingGlassIcon,
  filter: FunnelIcon,
  moreVertical: EllipsisVerticalIcon,
  upload: ArrowUpTrayIcon,
  download: ArrowDownTrayIcon,
  eye: EyeIcon,
  eyeSlash: EyeSlashIcon,
  mail: EnvelopeIcon,
  lock: LockClosedIcon,
  sparkles: SparklesIcon,
  document: DocumentTextIcon,
  banknotes: BanknotesIcon,
  chartBar: ChartBarIcon,
  shieldCheck: ShieldCheckIcon,
  clock: ClockIcon,
  microphone: MicrophoneIcon,
  stop: StopIcon,
  speaker: SpeakerWaveIcon,
  play: PlayIcon,
  photo: PhotoIcon,
  tag: TagIcon,
  copy: DocumentDuplicateIcon,
  devicePhoneMobile: DevicePhoneMobileIcon,
  externalLink: ArrowTopRightOnSquareIcon,
} as const;
